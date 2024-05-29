import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);  // État pour contrôler la visibilité du menu

    const toggleMenu = () => setIsOpen(!isOpen);  // Fonction pour basculer l'état

    return (
        <header className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-home-link">MEMORISE</Link>
            </div>
            <button className="hamburger" onClick={toggleMenu}> {/* Bouton pour basculer le menu */}
                &#9776;
            </button>
            <nav className={isOpen ? "navbar-links show" : "navbar-links"}>
                <Link to="/books" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <span>LIVRE</span>
                </Link>
                <Link to="/ebooks" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <span>EBOOK</span>
                </Link>
            </nav>
            <div className="navbar-search">
                <input type="search" placeholder="Recherche..." />
            </div>
            <div className="navbar-icons">
                <Link to="/account" className="navbar-icon">
                    <FaUser size="1.5em" />
                </Link>
                <Link to="/cart" className="navbar-icon">
                    <FaShoppingCart size="1.5em" />
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
