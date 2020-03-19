import React from "react";
import Navigation from './Navigation/Navigation'
import Header from './Header/Header'
import './App.css';

function App() {
  return (
    <div className="Site">
      <Header />
      <main className="Site-content">
        <Navigation />
      </main>
      <nav className="navbar absolute navbar-light bg-light">
        <p id="middle"> © Hunter 2020</p>
      </nav>
    </div>
  );
};
export default App;
