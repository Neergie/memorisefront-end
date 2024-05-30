import React from 'react';
import './Inscription.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

function Inscription() {
  return (
    <div className="login-container">
      <h2 className="title">INSCRIPTION</h2>
      <p className="register-text">
        Déjà un compte ? 
        <br></br>
        <a href="/login">Se connecter</a>
      </p>
      <div className="input-group">
        <FaEnvelope className="icon" />
        <input type="email" placeholder="EMAIL" />
      </div>
      <div className="input-group">
        <FaLock className="icon" />
        <input type="password" placeholder="MOT DE PASSE" />
      </div>
      <div className="input-group">
        <FaUser className="icon" />
        <input type="text" placeholder="PRÉNOM" />
      </div>
      <div className="input-group">
        <FaUser className="icon" />
        <input type="tel" placeholder="NOM" />
      </div>
      <button className="login-button">S'INSCRIRE</button>
      <button className="google-button">
        <FaEnvelope className="google-icon" />
        S'INSCRIRE VIA GOOGLE
      </button>
    </div>
  );
}

export default Inscription;
