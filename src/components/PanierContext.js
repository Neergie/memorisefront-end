import React, { createContext, useState, useEffect } from 'react';

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
    const [panier, setPanier] = useState(() => {
        const storedPanier = localStorage.getItem('panier');
        return storedPanier ? JSON.parse(storedPanier) : [];
    });

    useEffect(() => {
        localStorage.setItem('panier', JSON.stringify(panier));
    }, [panier]);

    const ajouterAuPanier = (produit) => {
        const produitExistant = panier.find(item => item.id === produit.id);
        if (produitExistant) {
            setPanier(panier.map(item =>
                item.id === produit.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setPanier([...panier, { ...produit, quantity: 1 }]);
        }
    };

    const removeItem = (id) => {
        setPanier(panier.filter(item => item.id !== id));
    };

    const clearPanier = () => {
        setPanier([]);
    };

    return (
        <PanierContext.Provider value={{ panier, ajouterAuPanier, removeItem, clearPanier }}>
            {children}
        </PanierContext.Provider>
    );
};

export default PanierContext;
