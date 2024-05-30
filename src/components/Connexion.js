import React from 'react';
import './Inscription.css';
import { FaEnvelope, FaLock, } from 'react-icons/fa';

function Connexion() {
  return (
    <div className="login-container">
      <h2 className="title">CONNEXION</h2>
      <p className="register-text">
        Pas de compte ? 
        <br></br>
        <a href="/register">S'inscrire</a>
      </p>
      <div className="input-group">
        <FaEnvelope className="icon" />
        <input type="email" placeholder="EMAIL" />
      </div>
      <div className="input-group">
        <FaLock className="icon" />
        <input type="password" placeholder="MOT DE PASSE" />
      </div>
    
      <button className="login-button">CONNEXION</button>
    </div>
  );
}

export default Connexion;
