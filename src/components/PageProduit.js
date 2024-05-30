import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PageProduit.css';

const PageProduit = () => {
    const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.monsite.com/produit/${id}`)
            .then(response => {
                setProduit(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du produit:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (!produit) {
        return <div className="error">404</div>;
    }

    return (
        <div className="page-produit">
            <div className="image-container">
                <img src={produit.image} alt={produit.titre} />
            </div>
            <div className="details-container">
                <h1>{produit.titre}</h1>
                <p><strong>Auteur:</strong> {produit.auteur}</p>
                <p><strong>ISBN:</strong> {produit.isbn}</p>
                <p><strong>Prix:</strong> {produit.prix.toFixed(2)} €</p>
                <p><strong>Description:</strong> {produit.description}</p>
                <button className="btn-ajouter-panier">Ajouter au panier</button>
            </div>
        </div>
    );
};

export default PageProduit;
