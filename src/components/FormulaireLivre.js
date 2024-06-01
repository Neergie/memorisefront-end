import React, { useState } from 'react';
import axios from 'axios';
import './FormulaireLivre.css';

function FormulaireLivre() {
    const [livre, setLivre] = useState({
        image: '',
        altText: '',
        titre: '',
        description: '',
        auteurs: '',
        genres: '',
        editeurs: '',
        isbn: '',
        datePublication: '',
        stock: '',
        prix: '',
        estEbook: false
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setLivre({
            ...livre,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setLivre({ ...livre, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            title: livre.titre,
            description: livre.description,
            authors: livre.auteurs.split(',').map(auteur => auteur.trim()), // auteur séparé par virugle
            genres: livre.genres.split(',').map(genre => genre.trim()), // genres séparé par virugle
            editors: livre.editeurs.split(',').map(editor => editor.trim()), // split = tableau map transforme trim supprimer les espaces
            isbn: livre.isbn,
            publicationDate: livre.datePublication,
            stock: parseInt(livre.stock, 10),
            price: parseFloat(livre.prix),
            ebook: livre.estEbook,
            coverImage: livre.image || null
        };

        axios.post('http://localhost:8000/book/add', data)
            .then(response => {
                console.log('Livre ajouté avec succès:', response.data);
                setLivre({
                    image: '',
                    altText: '',
                    titre: '',
                    description: '',
                    auteurs: '',
                    genres: '',
                    editeurs: '',
                    isbn: '',
                    datePublication: '',
                    stock: '',
                    prix: '',
                    estEbook: false
                });
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du livre:', error);
            });
    };

    return (
        <div className="formulaire-container">
            <h1>Formulaire de livre</h1>
            <div className="formulaire-livre">
                <div className="section-gauche">
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {livre.image && <img src={livre.image} alt="Aperçu" className="image-apercu"/>} 
                    <input
                        type="text"
                        name="altText"
                        placeholder="Texte alternatif"
                        value={livre.altText}
                        onChange={handleInputChange}
                        className="input-alt-text"
                    />
                </div>
                <div className="section-droite">
                    <input
                        type="text"
                        name="titre"
                        placeholder="Titre"
                        value={livre.titre}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={livre.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="auteurs"
                        placeholder="Auteurs (IDs séparés par des virgules)"
                        value={livre.auteurs}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="genres"
                        placeholder="Genres (IDs séparés par des virgules)"
                        value={livre.genres}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="editeurs"
                        placeholder="Éditeurs (IDs séparés par des virgules)"
                        value={livre.editeurs}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="isbn"
                        placeholder="ISBN"
                        value={livre.isbn}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="datePublication"
                        value={livre.datePublication}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={livre.stock}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="prix"
                        placeholder="Prix"
                        value={livre.prix}
                        onChange={handleInputChange}
                    />
                    <label className="switch-container">
                        <span>eBook:</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={livre.estEbook}
                                onChange={handleInputChange}
                                name="estEbook"
                            />
                            <span className="slider"></span>
                        </label>
                    </label>
                    <button onClick={handleSubmit} className="btn-envoyer">Envoyer</button>
                </div>
            </div>
        </div>
    );
}

export default FormulaireLivre;
