import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue dans Memorise!</h1>
      <Link to="/register">
        <button className="login-button">Aller à la page d'inscription</button>
      </Link>
    </div>
  );
}

export default Home;
