import { ethers, providers } from "ethers";
import { ChainId, ReadonlyRpcEndpoint } from "../constant";

export const ReadOnlyProvider: { [key: number]: any } = {
  [ChainId.HECO_MAINNET]: new providers.JsonRpcProvider(
    ReadonlyRpcEndpoint[ChainId.HECO_MAINNET],
    {
      chainId: ChainId.HECO_MAINNET,
      name: "Heco Mainnet",
    }
  ),
  [ChainId.HECO_TESTNET]: new providers.JsonRpcProvider(
    ReadonlyRpcEndpoint[ChainId.HECO_TESTNET],
    {
      chainId: ChainId.HECO_TESTNET,
      name: "Heco Testnet",
    }
  ),
};
