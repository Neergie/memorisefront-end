import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductGrid.css';

const GrilleProduits = ({ categorie }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cette fonction est appelée chaque fois que la catégorie change
  useEffect(() => {
    setLoading(true); // Indique que le chargement des produits a commencé

    // Fait une requête GET pour obtenir les produits de la catégorie sélectionnée
    axios.get(`http://localhost:8000/products?categorie=${categorie}`)
      .then(response => {
        // Si la requête réussit, on stocke les produits dans l'état
        setProduits(response.data);
        setLoading(false);
      })
      .catch(() => {
        // Gestion erreur ->on arrête le chargement
        setProduits([]);
        setLoading(false);
      });
  }, [categorie]);

  // Fonction pour générer les produits ou les espaces vides si aucun produit n'est disponible
  const renderProduits = () => {
    if (loading) {
      return <div className="loading">Chargement...</div>;
    }

    if (produits.length > 0) {
      return produits.map(produit => (
        <a href={`/produit/${produit.id}`} className="produit-card" key={produit.id}>
          <img src={produit.image} alt={produit.nom} />
          <div>{produit.nom}</div>
          <div>{produit.prix.toFixed(2)} €</div>
        </a>
      ));
    }

    return <div className="produit-vide">Aucun produit à afficher</div>;
  };

  // Fonction pour générer des espaces vides pour compléter la ligne
  const renderPlaceholders = () => {
    const placeholders = 4 - (produits.length % 4);
    return Array.from({ length: placeholders }).map((_, index) => (
      <div key={index} className="produit-vide">Aucun produit à afficher</div>
    ));
  };

  return (
    <div className="grille-produits-container">
      <div className="categories">
        {renderProduits()}
        {renderPlaceholders()}
      </div>
    </div>
  );
};

export default GrilleProduits;
