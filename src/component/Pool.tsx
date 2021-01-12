import { utils } from "ethers";
import React from "react";
import { Pool } from "../constant/pools/yfii-moon";
import { usePoolApy } from "../hooks/useFarmApy";

export const YFIIPoolCard: React.VFC<{ pool: Pool, hideStopped?: boolean }> = ({ pool, hideStopped }) => {
    const { totalStake, apy, rewardRate, stats, isPoolStopped } = usePoolApy(pool, utils.parseUnits("1", 18), utils.parseUnits("1", 18));
    // return <>
    //     <p>The APY of {pool.name} is {apy}</p>
    //     <p>Total Staked: {utils.formatUnits(totalStake, 18)}</p>
    //     <p>RewardRate: {utils.formatUnits(rewardRate, 18)}</p>
    // </>
    if (hideStopped && isPoolStopped) return <></>
    if (!stats.mission) return <pre style={{ textAlign: 'center' }} >{`
=============================== ${pool.name} ===============================
Loading Lunar Model: ${pool.earnContractAddress}...
=====================================================================
`}</pre>

    
    return <pre style={{ textAlign: 'center' }} >{`
=============================== ${pool.name} ===============================
Lunar Model       : ${pool.earnContractAddress}
Current Mission   : ${stats.mission}

There are total   : ${utils.formatUnits(totalStake, pool.tokenDecimals)} ${pool.name} staked in ${pool.name} vault

RewardRate        : ${utils.formatUnits(rewardRate, pool.itokenDecimals)} ${pool.name} / second
APY               : ${apy}%
=====================================================================
`}
    </pre>
}

