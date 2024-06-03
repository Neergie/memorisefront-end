import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import logomemorise from '../Img/logomemorise.svg';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);  // État pour contrôler la visibilité du menu
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // État pour vérifier si l'utilisateur est connecté
    const [searchQuery, setSearchQuery] = useState('');  // État pour la barre de recherche

    const toggleMenu = () => setIsOpen(!isOpen);  // Fonction pour basculer l'état
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}/5`);
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-home-link">
                    <img src={logomemorise} alt="Logo Memorise" className="logo" /> {/* Utilisez le logo */}
                </Link>
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
                <Link to="/blog" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <span>BLOG</span>
                </Link>
            </nav>
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input 
                    type="search" 
                    placeholder="Recherche..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </form>
            <div className="navbar-icons">
                <Link to="/account" className="navbar-icon">
                    <FaUser size="1.5em" />
                </Link>
                <Link to="/cart" className="navbar-icon">
                    <FaShoppingCart size="1.5em" />
                </Link>
                {isAuthenticated && (
                    <button className="navbar-link" onClick={handleLogout}>Déconnexion</button>
                )}
            </div>
        </header>
    );
}

export default Navbar;
