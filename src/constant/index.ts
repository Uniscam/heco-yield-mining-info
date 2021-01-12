export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
  HECO_MAINNET = 128,
  HECO_TESTNET = 256,
  MATIC_MAINNET = 137,
}

export const ReadonlyRpcEndpoint: { [chaidId: number]: string } = {
  [ChainId.HECO_MAINNET]: "https://http-mainnet.hecochain.com",
  [ChainId.HECO_TESTNET]: "https://http-testnet.hecochain.com",
};
