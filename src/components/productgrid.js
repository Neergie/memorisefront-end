import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductGrid.css';

const GrilleProduits = ({ booksCount }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/books/${booksCount}`)
      .then(response => {
        console.log('Données reçues:', response.data);
        setProduits(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits:', error);
        setProduits([]);
        setLoading(false);
      });
  }, [booksCount]);

  const renderProduits = () => {
    if (loading) {
      return <div className="loading">Chargement...</div>;
    }

    if (produits.length > 0) {
      return (
        <div className="results-grid">
          {produits.map(produit => {
            const imageUrl = produit.coverImage || `${process.env.PUBLIC_URL}/image_par_defaut.jpeg`;
            const altText = produit.altImg || 'Image du produit';
            return (
              <a href={`/book/${produit.id}`} className="produit-card" key={produit.id}>
                <img src={imageUrl} alt={altText} />
                <h2>{produit.name}</h2>
                <p>{produit.price.toFixed(2)} €</p>
              </a>
            );
          })}
        </div>
      );
    }

    return <div className="produit-vide">Aucun produit à afficher</div>;
  };

  return (
    <div className="grille-produits-container">
      <h1>Liste des Produits</h1>
      {renderProduits()}
    </div>
  );
};

export default GrilleProduits;
