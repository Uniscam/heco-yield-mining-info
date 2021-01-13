import { YFII_MOON_POOLS_HECO } from '../constant/pools';
import { YFIIPoolCard } from '../component/Pool';
import { ethers } from 'ethers';
import { ILunarModule } from '../constant/abi';

export function Heco() {
    const onHarvest = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum!);
      const missions = await Promise.all(YFII_MOON_POOLS_HECO.filter(pool => pool.earnContractAddress !== "0x59dfe9c9b67ccf62b4d42c7a884c1ccb20adffaa").map(async pool => {
        const contract = new ethers.Contract(pool.earnContractAddress, ILunarModule, provider);

        return await contract.mission();
      }));

      const batchHarvetAbi = [
        "function harvest(address[] memory addresses) external"
      ];
      const batchHarvestContract = new ethers.Contract("0x6895B5D364049410dd96783A0624908F6B79FDFa", batchHarvetAbi, provider.getSigner());

      await batchHarvestContract.harvest(missions);

      alert("Success");
    };

    return <>
        <pre>
       {`============ YFII on Heco ================`}
      </pre>
        { YFII_MOON_POOLS_HECO.map(pool => <YFIIPoolCard
          key={pool.name}
          pool={pool}
      ></YFIIPoolCard>)}
      <button onClick={onHarvest}>Harvest</button>
        </>
}