import React, { createContext, useState } from 'react';

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);

    const ajouterAuPanier = (produit) => {
        // Vérifiez si le produit est déjà dans le panier
        const produitExistant = panier.find(item => item.id === produit.id);
        if (produitExistant) {
            // Incrémentez la quantité si le produit est déjà dans le panier
            setPanier(panier.map(item =>
                item.id === produit.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // Ajoutez le produit au panier avec une quantité initiale de 1
            setPanier([...panier, { ...produit, quantity: 1 }]);
        }
    };

    const removeItem = (id) => {
        setPanier(panier.filter(item => item.id !== id));
    };

    return (
        <PanierContext.Provider value={{ panier, ajouterAuPanier, removeItem }}>
            {children}
        </PanierContext.Provider>
    );
};

export default PanierContext;
