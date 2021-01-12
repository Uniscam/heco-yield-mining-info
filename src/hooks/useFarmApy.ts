import { useCallback, useEffect, useMemo, useState } from "react";
import LunarModule from "../constant/abi/LunarModule.json";
import { ReadOnlyProvider } from "../blockchain/providers";
import { BigNumber, BigNumberish, utils } from "ethers";
import { ethers } from "ethers";
import { ChainId } from "../constant";
import { getBasicsOf } from "../blockchain/LunarModule";

export function usePoolApy(
  poolAddress: string,
  everyRewardValue: BigNumber,
  everyStakingValue: BigNumber,
  rewardTokenDecimal: number,
  stakingTokenDecimal: number
) {
  const [rewardRate, updateRewardRate] = useState(BigNumber.from(0));
  const [totalStaked, updateTotalStaked] = useState(BigNumber.from(0));
  const [stats, updateStats] = useState({
    mission: "",
  });

  const contract = useMemo(() => {
    return new ethers.Contract(
      poolAddress,
      LunarModule,
      ReadOnlyProvider[ChainId.HECO_MAINNET]
    );
  }, [poolAddress]);

  const update = useCallback(async () => {
    // rewardRate = reward for every second staking
    // const rewardRate = await contract.rewardRate();
    // // totalStaked amounts for this pool
    // const totalStaked = await contract.totalSupply();
    // const currentMission = await contract.mission();
    const { rewardRate, totalSupply, mission } = await getBasicsOf(
      ChainId.HECO_MAINNET,
      poolAddress
    );

    updateRewardRate(rewardRate);
    updateTotalStaked(totalSupply);
    updateStats({
      mission,
    });
  }, [poolAddress]);

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
    if (rewardTokenDecimal === 0 || stakingTokenDecimal === 0) {
      return "---.--";
    }
    const formattedRewardTokenValue = utils.formatUnits(
      everyRewardValue,
      rewardTokenDecimal
    );
    const formattedStakingTokenValue = utils.formatUnits(
      everyStakingValue,
      stakingTokenDecimal
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
      Number(formattedRewardTokenValue);
    const totalStakedTokenInBNB =
      Number(formattedtotalStaked) * Number(formattedStakingTokenValue);
    const apy = yearlyRewardInBNB / totalStakedTokenInBNB;
    const apyForDisplay = (apy * 100).toFixed(2);
    return apy === Number.POSITIVE_INFINITY ? "---.--" : apyForDisplay;
  }, [
    everyRewardValue,
    everyStakingValue,
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
    stats,
    isPoolStopped,
  };
}
