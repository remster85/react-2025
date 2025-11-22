import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BalanceSheet from './pages/BalanceSheet';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="App-header-inner">
            <div className="App-brand">My React App</div>
            <nav className="App-nav">
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Contact</NavLink>
              <NavLink to="/balance-sheet" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Balance Sheet</NavLink>
            </nav>
          </div>
        </header>

        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/balance-sheet" element={<BalanceSheet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
