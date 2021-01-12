import { useCallback, useEffect, useMemo, useState } from "react";
import LunarModule from "../constant/abi/LunarModule.json";
import { ReadOnlyProvider } from "../blockchain/providers";
import { utils } from "ethers";
import { ethers } from "ethers";
import { ChainId } from "../constant";

export function usePoolApy(
  poolAddress: string,
  everyRewardTokenInBNB: string,
  everyStakingTokenInBNB: string,
  rewardTokenDecimal: string,
  stakingTokenDecimal: string
) {
  const [rewardRate, updateRewardRate] = useState("0");
  const [totalStaked, updateTotalStaked] = useState("0");

  const contract = useMemo(() => {
    return new ethers.Contract(
      poolAddress,
      LunarModule,
      ReadOnlyProvider[ChainId.HECO_MAINNET]
    );
  }, [poolAddress]);

  const update = useCallback(async () => {
    // rewardRate = reward for every second staking
    const rewardRate = await contract.rewardRate();
    // totalStaked amounts for this pool
    const totalStaked = await contract.totalSupply();

    updateRewardRate(rewardRate);
    updateTotalStaked(totalStaked);
  }, [contract]);

  // let apyForDisplay = '---.--'
  // if (rewardRate !== '0' || totalStaked !== '0' ) {
  //     // 365天，24小时，每个小时3600秒
  //     const yearlyRewardInBNB = Number(rewardRate) * 365 * 24 * 3600
  //     // 年利润 / 总抵押额。均以BNB为计价单位
  //     const _apy = (yearlyRewardInBNB / Number(totalStaked))
  //     apyForDisplay = (_apy * 100).toFixed(2)
  // }

  const memoizedApy = useMemo(() => {
    if (Number(rewardTokenDecimal) === 0 || Number(stakingTokenDecimal) === 0) {
      return "---.--";
    }
    // BNB is 18 long
    const formattedRewardTokenInBNB = utils.formatUnits(
      everyRewardTokenInBNB,
      18
    );
    const formattedStakingTokenInBNB = utils.formatUnits(
      everyStakingTokenInBNB,
      18
    );

    const formattedRewardRate = utils.formatUnits(
      rewardRate,
      rewardTokenDecimal
    );
    const formattedtotalStaked = utils.formatUnits(
      totalStaked,
      stakingTokenDecimal
    );
    // 365天，24小时，每个小时3600秒
    const yearlyRewardInBNB =
      Number(formattedRewardRate) *
      365 *
      24 *
      3600 *
      Number(formattedRewardTokenInBNB);
    const totalStakedTokenInBNB =
      Number(formattedtotalStaked) * Number(formattedStakingTokenInBNB);
    const apy = yearlyRewardInBNB / totalStakedTokenInBNB;
    const apyForDisplay = (apy * 100).toFixed(2);
    return apy === Number.POSITIVE_INFINITY ? "---.--" : apyForDisplay;
  }, [
    everyRewardTokenInBNB,
    everyStakingTokenInBNB,
    rewardTokenDecimal,
    stakingTokenDecimal,
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
  };
}
