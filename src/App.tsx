import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Footer } from './component/Footer';
import { YFII_MOON_POOLS_HECO } from './constant/pools';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <pre>
          {`
****************** 👨‍🌾 UNOFFICIAL Heco YIELD FARMING CALCULATOR 👨‍🌾 ******************
*** Disclaimer ***

I am in no way affiliated with the above projects, nor do I endorse them. 
Please do your own research before investing.
************************************************************************************
`}
        </pre>
      </header>
      <pre style={{ textAlign: 'left' }}>Contracts
       {JSON.stringify(YFII_MOON_POOLS_HECO, null, 2)}
      </pre>
      { YFII_MOON_POOLS_HECO.map(pool => {
        return <pre>{`
Name: ${pool.name}, Pool Address: ${pool.earnContractAddress}
Staking Token: ${pool.tokenAddress}, Reward Token: ${pool.claimedTokenAddress}
`}</pre>
      }) }
      <Footer />
    </div>
  );
}

export default App;
