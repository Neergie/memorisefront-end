import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductGrid.css';

function GrilleProduits() {
    const [produits, setProduits] = useState([]);
    const [categorieActive, setCategorieActive] = useState('Tous');
    const [loading, setLoading] = useState(false);

    const categories = ['Tous', 'Action', 'Aventure', 'Éducatif', 'Fantastique'];
    console.log('Categorie test');

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.monsite.com/produits?categorie=${categorieActive}`)
            .then(response => {
                setProduits(response.data);
                setLoading(false);
            })
            .catch(() => {
                setProduits([]);
                setLoading(false);
            });
    }, [categorieActive]);

    const handleCategorieChange = (categorie) => {
        setCategorieActive(categorie);
    };

    return (
        <div className="grille-produits-container">
            <div className="categories">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`categorie-btn ${cat === categorieActive ? 'active' : ''}`}
                        onClick={() => handleCategorieChange(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="grille-produits">
                {/* Booléan pour afficher le chargement */}
                {loading ? <div className="loading">Chargement...</div> :
                produits.length > 0 ? produits.map(produit => (
                    <a href={`/produit/${produit.id}`} className="produit-card" key={produit.id}>
                        <img src={produit.image} alt={produit.nom} />
                        <div>{produit.nom}</div>
                        <div>{produit.prix.toFixed(2)} €</div>
                    </a>
                )) : <div className="produit-vide">Aucun produit à afficher</div>}
                {/* Ajoute des placeholders si nécessaire */}
                {Array.from({ length: 11 }).map((_, index) => (
                    <div key={index} className="produit-vide">Aucun produit à afficher</div>
                ))}
            </div>
        </div>
    );
}

export default GrilleProduits;
