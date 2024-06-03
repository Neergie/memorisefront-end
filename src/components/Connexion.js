import React, { useState } from 'react';
import axios from './axiosConfig'; 
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import './Connexion.css';

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialisation

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email,
      password
    };

    axios.post('/login', formData)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('authToken', token); // Stocker le jeton dans le localstorage
        console.log('Connexion réussie:', response.data);
        navigate('/books'); // après la connexion réussie
        window.location.reload(); // Rafraichir la page
      })
      .catch(error => {
        setError('Email ou mot de passe incorrect.');
        console.error('Erreur lors de la connexion:', error);
      });
  };

  return (
    <div className="login-container">
      <h2 className="title">CONNEXION</h2>
      <p className="register-text">
        Pas de compte ? 
        <br></br>
        <a href="/register">S'inscrire</a>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input 
            type="email" 
            placeholder="EMAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input 
            type="password" 
            placeholder="MOT DE PASSE" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">CONNEXION</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Connexion;
