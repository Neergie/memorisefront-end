import React, { useState } from 'react';
import axios from './axiosConfig'; 
import './Inscription.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialisation


  const handleSubmit = (event) => {
    event.preventDefault();


    const formData = {
      email,
      password,
      firstname: prenom,
      lastname: nom
    };

    axios.post('/register', formData)
      .then(response => {
        console.log('Inscription réussie:', response.data);
        navigate('/login'); // après la connexion réussie
      })
      .catch(error => {
        setError('Erreur lors de l\'inscription');
        console.error('Erreur lors de l\'inscription:', error);
      });
  };

  return (
    <div className="login-container">
      <h2 className="title">INSCRIPTION</h2>
      <p className="register-text">
        Déjà un compte ? 
        <br />
        <a href="/login">Se connecter</a>
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
        <div className="input-group">
          <FaUser className="icon" />
          <input 
            type="text" 
            placeholder="PRÉNOM" 
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaUser className="icon" />
          <input 
            type="text" 
            placeholder="NOM" 
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">S'INSCRIRE</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Inscription;
