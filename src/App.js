import React from "react";
import Navigation from './Navigation/Navigation'
import Header from './Header/Header'
//import { Helmet } from 'react-helmet';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="Site">
        <Header />
        <main className="Site-content">
          <Navigation />
        </main>
        <nav className="navbar absolute navbar-light bg-light">
          <p id="middle"> © Hunter 2020</p>
        </nav>
      </div>
    </BrowserRouter>
  );
};
export default App;


