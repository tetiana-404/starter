import React from 'react';
import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import CurrencyConverter2 from './Components/CurrencyConverter2';
import CurrencyTable from './Components/CurrencyTable';



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className=" container">
          <img src={logo} className="App-logo" alt="logo" />
          Logo text.
        </div>
      </header>
      <main className=" container mt-4 mb-4">
        <CurrencyTable />
        
        <CurrencyConverter2 />
      </main>
      
      <footer className="bg-dark text-light py-3 text-center">
            <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </footer>
    </div>
  );
}

export default App;
