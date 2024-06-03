import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PanierContext from './PanierContext';
import './PageProduit.css';

const PageProduit = () => {
    const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { ajouterAuPanier } = useContext(PanierContext); // Utilisation du contexte du panier

    useEffect(() => {
        axios.get(`http://localhost:8000/book/${id}`)
            .then(response => {
                setProduit(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du produit:', error);
                setLoading(false);
            });
    }, [id]);

    const handleAjouterAuPanier = (produit) => {
        ajouterAuPanier(produit);
        setMessage('Livre ajouté au panier !');
        setTimeout(() => setMessage(''), 500); // time 1.2 s
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (!produit) {
        return <div className="error">404 - Produit non trouvé</div>;
    }

    const auteur = produit.authors.length > 0 ? `${produit.authors[0].firstname} ${produit.authors[0].lastname}` : "Auteur inconnu";
    const imageUrl = produit.coverImage || `${process.env.PUBLIC_URL}/image_par_defaut.jpeg`; // par défaut
    const altText = produit.altImg || 'Image du produit';

    return (
        <div className="page-produit">
            <div className="image-container">
                <img src={imageUrl} alt={altText} />
            </div>
            <div className="details-container">
                <h1>{produit.name}</h1>
                <p><strong>Auteur:</strong> {auteur}</p>
                <p><strong>ISBN:</strong> {produit.isbn}</p>
                <p><strong>Prix:</strong> {produit.price.toFixed(2)} €</p>
                <p><strong>Stock:</strong> {produit.stock}</p>
                <p><strong>Description:</strong> {produit.description}</p>

                <button disabled={produit.stock === 0} className="btn-ajouter-panier" onClick={() => handleAjouterAuPanier(produit)}>Ajouter au panier</button>
                {message && <div className="message-validation">{message}</div>}
            </div>
        </div>
    );
};

export default PageProduit;
