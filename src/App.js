// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Inscription from './components/Inscription';
import Navbar from './components/Navbar'; 
import PageLivres from './components/PageLivres';
import Panier from './components/Panier';
import FormulaireLivre from './components/FormulaireLivre';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Menu de navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Inscription />} />
          <Route path="/books" element={<PageLivres />} />
          <Route path="/cart" element={<Panier />} />
          <Route path="/upload" element={<FormulaireLivre />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
