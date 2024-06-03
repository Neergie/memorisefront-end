import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8000/book/search/${query}/5`)
            .then(response => {
                setResults(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la recherche:', error);
                setLoading(false);
            });
    }, [query]);

    const handleClick = (id) => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="search-results">
            <h1>Résultats de recherche pour "{query}"</h1>
            {loading ? (
                <div className="loading">Chargement...</div>
            ) : results.length > 0 ? (
                <div className="results-grid">
                    {results.map(result => (
                        <div className="result-item" key={result.id} onClick={() => handleClick(result.id)}>
                            <img src={result.coverImage || `${process.env.PUBLIC_URL}/image_par_defaut.jpeg`} alt={result.altImg || 'Image du produit'} />
                            <h2>{result.name}</h2>
                            <p>{result.price.toFixed(2)} €</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-results">Aucun produit trouvé</div>
            )}
        </div>
    );
};

export default SearchResults;
