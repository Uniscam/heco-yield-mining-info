import { useCallback, useEffect, useMemo, useState } from "react";
import LunarModule from "../constant/abi/LunarModule.json";
import { ReadOnlyProvider } from "../blockchain/providers";
import { BigNumber, utils } from "ethers";
import { ethers } from "ethers";
// import { ChainId } from "../constant";
import { getBasicsOf } from "../blockchain/LunarModule";
import type { Pool } from "../constant/pools/Pool";

export function usePoolApy(
  pool: Pool,
  everyRewardValue: BigNumber,
  everyStakingValue: BigNumber
  // pool.itokenDecimals: number,
  // pool.tokenDecimals: number
) {
  const [rewardRate, updateRewardRate] = useState(BigNumber.from(0));
  const [totalStaked, updateTotalStaked] = useState(BigNumber.from(0));
  const [stats, updateStats] = useState({
    mission: "",
  });

  const contract = useMemo(() => {
    return new ethers.Contract(
      pool.earnContractAddress,
      LunarModule,
      ReadOnlyProvider[pool.chainId]
    );
  }, [pool]);

  const update = useCallback(async () => {
    // rewardRate = reward for every second staking
    // const rewardRate = await contract.rewardRate();
    // // totalStaked amounts for this pool
    // const totalStaked = await contract.totalSupply();
    // const currentMission = await contract.mission();
    const { rewardRate, totalSupply, mission } = await getBasicsOf(
      pool.chainId,
      pool.earnContractAddress
    );

    updateRewardRate(rewardRate);
    updateTotalStaked(totalSupply);
    updateStats({
      mission,
    });
  }, [pool.earnContractAddress, pool.chainId]);

  // let apyForDisplay = '---.--'
  // if (rewardRate !== '0' || totalStaked !== '0' ) {
  //     // 365天，24小时，每个小时3600秒
  //     const yearlyRewardInBNB = Number(rewardRate) * 365 * 24 * 3600
  //     // 年利润 / 总抵押额。均以BNB为计价单位
  //     const _apy = (yearlyRewardInBNB / Number(totalStaked))
  //     apyForDisplay = (_apy * 100).toFixed(2)
  // }

  const isPoolStopped = useMemo(() => rewardRate.eq(0), [rewardRate]);

  const memoizedApy = useMemo(() => {
    if (pool.itokenDecimals === 0 || pool.tokenDecimals === 0) {
      return "---.--";
    }
    const formattedRewardTokenValue = utils.formatUnits(
      everyRewardValue,
      pool.itokenDecimals
    );
    const formattedStakingTokenValue = utils.formatUnits(
      everyStakingValue,
      pool.tokenDecimals
    );

    const formattedRewardRate = utils.formatUnits(
      rewardRate,
      pool.itokenDecimals
    );
    const formattedtotalStaked = utils.formatUnits(
      totalStaked,
      pool.tokenDecimals
    );
    // 365天，24小时，每个小时3600秒
    const yearlyRewardInBNB =
      Number(formattedRewardRate) *
      365 *
      24 *
      3600 *
      Number(formattedRewardTokenValue);
    const totalStakedTokenInBNB =
      Number(formattedtotalStaked) * Number(formattedStakingTokenValue);
    const apy = yearlyRewardInBNB / totalStakedTokenInBNB;
    const apyForDisplay = (apy * 100).toFixed(2);
    return apy === Number.POSITIVE_INFINITY ? "---.--" : apyForDisplay;
  }, [
    everyRewardValue,
    everyStakingValue,
    pool.itokenDecimals,
    pool.tokenDecimals,
    rewardRate,
    totalStaked,
  ]);
  useEffect(() => {
    if (contract) {
      update();
    }
  }, [contract, update]);

  return {
    update,
    apy: memoizedApy,
    totalStake: totalStaked,
    rewardRate: rewardRate,
    stats,
    isPoolStopped,
  };
}
