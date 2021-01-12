import { YFII_MOON_POOLS_HECO } from '../constant/pools';
import { YFIIPoolCard } from '../component/Pool';

export function Heco() {
    return <>
        <pre>
       {`============ YFII on Heco ================`}
      </pre>
      { YFII_MOON_POOLS_HECO.map(pool => <YFIIPoolCard
          pool={pool}
      ></YFIIPoolCard>)}
        </>
}