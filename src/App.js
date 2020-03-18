import React from "react";
import Navigation from './Navigation/Navigation'
import Header from './Header/Header'
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Navigation />
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <p id="middle"> © Hunter 2020</p>
      </nav>
    </div>
  );
};
export default App;
