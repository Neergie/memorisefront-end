import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <h3>MEMORISE</h3>
                    <p>La bibliothèque en ligne</p>
                </div>
                <div className="footer-center">
                    <h3>Contact</h3>
                    <p>Email: support@memorise.com</p>
                    <p>Téléphone: +33 1 23 45 67 89</p>
                </div>
                <div className="footer-right">
                    <h3>Suivez-nous</h3>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 MEMORISE. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
