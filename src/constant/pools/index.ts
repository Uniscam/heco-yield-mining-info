import { pools } from "./yfii-moon";

export const YFII_MOON_POOLS_BSC = pools.filter(pool => pool.chainId === 56);
export const YFII_MOON_POOLS_HECO = pools.filter(pool => pool.chainId === 128);
