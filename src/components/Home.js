import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue dans Memorise</h1>
      <div className="button-container">
        <Link to="/register">
          <button className="action-button">S'inscrire</button>
        </Link>
        <Link to="/login">
          <button className="action-button">Connexion</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
