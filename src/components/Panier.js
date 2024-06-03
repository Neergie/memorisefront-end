import React, { useContext, useState } from 'react';
import './Panier.css';
import PanierContext from './PanierContext';
import axios from './axiosConfig';

function Panier() {
    const { panier, removeItem, clearPanier } = useContext(PanierContext);
    const [message, setMessage] = useState('');

    // Calcul du prix total
    function calculerTotal(panier) {
        let total = 0;
        for (let i = 0; i < panier.length; i++) {
            const item = panier[i];
            total = total + (item.price * item.quantity);
        }
        return total;
    }

    const handleCommander = () => {
        const orderData = {
            basket: panier.map(item => ({
                book_id: item.id,
                quantity: item.quantity,
            })),
            total: calculerTotal(panier),
        };

        axios.post('/payment', orderData)
            .then(response => {
                setMessage('Commande passée avec succès !');
                clearPanier(); // Vider le panier après une commande réussie
            })
            .catch(error => {
                console.error('Erreur lors de la commande:', error);
                setMessage('Erreur lors de la commande. Veuillez réessayer.');
            });
    };

    return (
        <div className="panier">
            <h1>Panier</h1>
            <div className="panier-items">
                {panier.map(function(item) {
                    return (
                        <div key={item.id} className="panier-item">
                            <span>{item.quantity} x {item.name}</span>
                            <span>{item.price.toFixed(2)}€</span>
                            <button className='remove-button' onClick={function() { removeItem(item.id) }}>X</button>
                        </div>
                    );
                })}
            </div>
            <div className="panier-total">
                <span>Montant total</span>
                <span>{calculerTotal(panier).toFixed(2)}€</span>
                <button className="commander-button" onClick={handleCommander}>Commander</button>
            </div>
            {message && <p className="message-validation">{message}</p>}
        </div>
    );
}

export default Panier;
