import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Historiquecmd.css';

const Historiquecmd = () => {
    const [commandes, setCommandes] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/orders')
            .then(response => {
                setCommandes(response.data);
                setChargement(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des commandes:', error);
                setErreur('Erreur lors de la récupération des commandes. Veuillez réessayer.');
                setChargement(false);
            });
    }, []);

    const afficherCommandes = () => {
        if (chargement) {
            return <div className="loading">Chargement...</div>;
        }

        if (erreur) {
            return <div className="error">{erreur}</div>;
        }

        if (commandes.length === 0) {
            return <div className="no-orders">Aucune commande à afficher</div>;
        }

        return commandes.map(commande => (
            <div key={commande.id} className="commande">
                <div className="commande-entete">
                    <span>Commande #{commande.id}</span>
                    <span>Date: {new Date(commande.orderDate).toLocaleDateString()}</span>
                    <span>Statut: {commande.deliveryState}</span>
                </div>
                <div className="commande-details">
                    {commande.bookOrders.map(livreCommande => (
                        <div key={livreCommande.id} className="livre-commande">
                            <img 
                                src={livreCommande.book.coverImage || `${process.env.PUBLIC_URL}/image_par_defaut.jpeg`} 
                                alt={livreCommande.book.altImg || 'Image du produit'} 
                                className="livre-couverture"
                            />
                            <div className="livre-info">
                                <span>{livreCommande.book.name}</span>
                                <span>Quantité: {livreCommande.quantity}</span>
                                <span>Prix: {livreCommande.price.toFixed(2)} €</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="commande-pied">
                    <span>Total payé: {commande.totalPrice.toFixed(2)} €</span>
                    <span>État du paiement: {commande.transaction.paymentStatus}</span>
                </div>
            </div>
        ));
    };

    // Fonction pour vérifier si l'utilisateur est admin
    const isAdmin = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.roles.includes('ROLE_ADMIN');
        }
        return false;
    };

    return (
        <div className="historique-commandes">
            <h1>Historique des commandes</h1>
            {afficherCommandes()}
            {isAdmin() && (
                <button className="upload-button" onClick={() => navigate('/upload')}>Ajouter un livre</button>
            )}
        </div>
    );
};

export default Historiquecmd;
