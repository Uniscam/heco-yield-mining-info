import React, { useState } from 'react';
import './App.css';
import './style/theme.scss';
import { Footer } from './component/Footer';
import { YFII_MOON_POOLS_HECO } from './constant/pools';
import { YFIIPoolCard } from './component/Pool';

function App() {
  const [hideStopped, toggle] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <pre>
          {`
****************** 👨‍🌾 UNOFFICIAL YFII YIELD FARMING CALCULATOR 👨‍🌾 ******************
 Currently list  HECO
************************************************************************************
`}
        </pre>
      </header>
      <pre>
       {`============ YFII on Heco ================`}
      </pre>
      { YFII_MOON_POOLS_HECO.map(pool => <YFIIPoolCard
          pool={pool}
          hideStopped={hideStopped}
        ></YFIIPoolCard>)}
      <Footer />
    </div>
  );
}

export default App;
