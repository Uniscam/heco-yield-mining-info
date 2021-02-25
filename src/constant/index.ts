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
  [ChainId.BSC_TESTNET]: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  [ChainId.BSC_MAINNET]: "https://bsc-dataseed.binance.org",
};

export const ReadonlyExplorerLink: { [chaidId: number]: string } = {
  [ChainId.HECO_MAINNET]: "https://hecoinfo.com/address/",
  [ChainId.HECO_TESTNET]: "",
  [ChainId.BSC_MAINNET]: "https://bscscan.com/address/",
  [ChainId.BSC_TESTNET]: "",
};
