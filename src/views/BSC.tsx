import { YFII_MOON_POOLS_BSC } from '../constant/pools';
import { YFIIPoolCard } from '../component/Pool';

export function BSC() {
    return <>
        <pre>
       {`============ YFII on BSC ================`}
      </pre>
        { YFII_MOON_POOLS_BSC.map(pool => <YFIIPoolCard
          key={pool.name}
          pool={pool}
      ></YFIIPoolCard>)}
        </>
}