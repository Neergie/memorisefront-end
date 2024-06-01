import React, { useContext } from 'react';
import './Panier.css';
import PanierContext from './PanierContext';

function Panier() {
    const { panier, removeItem } = useContext(PanierContext);

    // Calcul du prix total
    function calculerTotal(panier) {
        let total = 0;
        for (let i = 0; i < panier.length; i++) {
            const item = panier[i];
            total = total + (item.price * item.quantity);
        }
        return total;
    }

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
                <button className="commander-button">Commander</button>
            </div>
        </div>
    );
}

export default Panier;
