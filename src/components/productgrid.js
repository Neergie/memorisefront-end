import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductGrid.css';

const ProductGrid = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://monapi/produits/${category}`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return <div className="product-placeholder">Chargement des produits...</div>;
    }

    if (products.length === 0) {
        // Créer quatre placeholders lorsque la liste des produits est vide
        return (
            <div className="grid-container">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="product-placeholder">
                        Aucun produit à afficher
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid-container">
            {products.map(product => (
                <div key={product.id} className="product">
                    {/* Ici, vous pourriez afficher l'image du produit si disponible */}
                    {product.name}
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
