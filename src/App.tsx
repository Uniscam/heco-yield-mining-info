import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import './App.scss';
import './style/theme.scss';
import { Footer } from './component/Footer';
import { Heco } from "./views/Heco";
import { BSC } from "./views/BSC";

function App() {
  const isOsDarkmode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useState(isOsDarkmode ? 'dark' : 'light');
  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Router>
    <div className={`App ${theme}`}>
      <header className="App-header">
        <pre>
          {`
****************** 👨‍🌾 UNOFFICIAL YFII YIELD FARMING CALCULATOR 👨‍🌾 ******************
`}
            <Link to="/">Home</Link> <Link to="/heco">Heco</Link> <Link to="/bsc">BSC</Link>
            <br></br>
            <button onClick={() => switchTheme()} >Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
            {`
************************************************************************************`}
        </pre>
        </header>
        <Switch>
          <Route path="/heco">
            <Heco />
          </Route>
          <Route path="/bsc">
            <BSC />
          </Route>
          <Route path="/">
            <p>Choose one of the network</p>
          </Route>
        </Switch>
      <Footer />
      </div>
      </Router>
  );
}

export default App;
