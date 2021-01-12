import { ChainId } from "../constant";
import { ILunarModule } from "../constant/abi";
import { multicall } from "./Multicall";

export async function getBasicsOf(networkId: ChainId, poolAddress: string) {
  const fragments = [
    ILunarModule.getFunction("rewardRate"),
    ILunarModule.getFunction("totalSupply"),
    ILunarModule.getFunction("mission"),
  ];
  const readCalls = fragments.map((frag) => ({
    target: poolAddress,
    callData: ILunarModule.encodeFunctionData(frag),
  }));
  const { rawReturns } = await multicall(networkId, readCalls);
  const [rewardRate, totalSupply, mission] = rawReturns.map(
    (res, idx) => ILunarModule.decodeFunctionResult(fragments[idx], res)[0]
  );
  return { rewardRate, totalSupply, mission };
}
