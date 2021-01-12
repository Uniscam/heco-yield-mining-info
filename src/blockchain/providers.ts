import { providers } from "ethers";
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
  [ChainId.BSC_MAINNET]: new providers.JsonRpcProvider(
    ReadonlyRpcEndpoint[ChainId.BSC_MAINNET],
    {
      chainId: ChainId.BSC_MAINNET,
      name: "BSC Mainnet",
    }
  ),
  [ChainId.BSC_TESTNET]: new providers.JsonRpcProvider(
    ReadonlyRpcEndpoint[ChainId.BSC_TESTNET],
    {
      chainId: ChainId.BSC_TESTNET,
      name: "BSC Testnet",
    }
  ),
};
