import { ChainId } from "../constant";
import { ReadOnlyProvider } from "./providers";
import Multicall from "../constant/abi/Multicall.json";
import { BigNumber, Contract, ethers } from "ethers";

export const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
  [ChainId.ROPSTEN]: "0x53C43764255c17BD724F74c4eF150724AC50a3ed",
  [ChainId.KOVAN]: "0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A",
  [ChainId.RINKEBY]: "0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821",
  [ChainId.GÖRLI]: "0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e",
  [ChainId.BSC_MAINNET]: "0xe348b292e8eA5FAB54340656f3D374b259D658b8",
  [ChainId.BSC_TESTNET]: "0xe348b292e8eA5FAB54340656f3D374b259D658b8",
  [ChainId.HECO_MAINNET]: "0x56171094a15B8caC4314C0F8930100B939503bd9",
  [ChainId.HECO_TESTNET]: "0xD1dbc88E6a94053B11dA07CA3E5CE24B282d3d32",
  [ChainId.MATIC_MAINNET]: "0x95028E5B8a734bb7E2071F96De89BABe75be9C8E",
};

type Call = {
  target: string;
  callData: any;
};

export async function multicall(
  networkId: ChainId,
  calls: Call[]
): Promise<{ timestamp: BigNumber; rawReturns: any[] }> {
  const provider = ReadOnlyProvider[networkId];
  const connectedMulticall = new Contract(
    MULTICALL_NETWORKS[networkId],
    Multicall,
    provider
  );
  const [timestamp, rawReturns] = await connectedMulticall.callStatic.aggregate(
    calls
  );
  return { timestamp, rawReturns };
}
