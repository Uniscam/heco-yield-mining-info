import { utils } from "ethers";
import React from "react";
import { Pool } from "../constant/pools/yfii-moon";
import { usePoolApy } from "../hooks/useFarmApy";
import { ReadonlyExplorerLink } from "../constant";

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

    
    return  <>
                <div style={{ textAlign: 'center' }} >
                    <div>=============================== {pool.name} ===============================</div>
                    <div>Lunar Model       : <a href={`${ReadonlyExplorerLink[pool.chainId]}${pool.earnContractAddress}`} target="_blank">{pool.earnContractAddress}</a></div>
                    <div>Current Mission   : <a href={`${ReadonlyExplorerLink[pool.chainId]}${stats.mission}`} target="_blank">{stats.mission}</a></div>

                    <div>There are total   : {utils.formatUnits(totalStake, pool.tokenDecimals)} {pool.name} staked in {pool.name} vault</div>

                    <div>RewardRate        : {utils.formatUnits(rewardRate, pool.itokenDecimals)} {pool.name} / second</div>
                    <div>APY               : {apy}%</div>
                    <div>=====================================================================</div>
                </div>
            </>
}

