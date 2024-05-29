import React, { useState } from 'react';
import './Panier.css';

function Panier() {
    // Exemple 
    const [items, setItems] = useState([
        { id: 1, name: "Jean de la fontaine", quantity: 1, price: 2.00 },
        { id: 2, name: "Minecraft PE", quantity: 2, price: 12.32 }
    ]);

    // Fonction pour supprimer un article du panier
    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Calcule montant 
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="panier">
            <h1>Panier</h1>
            <div className="panier-items">
                {items.map(item => (
                    <div key={item.id} className="panier-item">
                        <span>{item.quantity} x {item.name}</span>
                        <span>{item.price.toFixed(2)}€</span>
                        <button className='remove-button' onClick={() => removeItem(item.id)}>X</button>
                    </div>
                ))}
            </div>
            <div className="panier-total">
                <span>Montant total</span>
                <span>{totalPrice.toFixed(2)}€</span>
                <button className="commander-button">Commander</button>
            </div>
        </div>
    );
}

export default Panier;
