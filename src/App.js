import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './navbar';
import './App.css';
// Pages
import Home from "./home";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import AllData from "./alldata";
import Login from "./login";
import CreateAccount from "./createaccount";
function App() {
  return (
    <Router>
        <div className="App">
          <header className="App-header">
            <NavBar />
          </header>
          <div className='App-content'>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="deposit" element={<Deposit />} />
                <Route path="withdraw" element={<Withdraw />} />
                <Route path="alldata" element={<AllData />} />
                <Route path="login" element={<Login />} />
                <Route path="createaccount" element={<CreateAccount />} />
                <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
