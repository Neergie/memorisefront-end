import React, { useState, useEffect } from 'react';
import axios from './axiosConfig'; 
import './FormulaireLivre.css';

function FormulaireLivre() {
    const [livre, setLivre] = useState({
        image: '',
        altText: '',
        titre: '',
        description: '',
        auteurs: [],
        genres: [],
        editeurs: [],
        isbn: '',
        datePublication: '',
        stock: '',
        prix: '',
        estEbook: false
    });

    const [options, setOptions] = useState({
        genres: [],
        editeurs: [],
        auteurs: []
    });

    useEffect(() => {
        // Récupérer les genres, éditeurs et auteurs depuis l'API
        const fetchData = async () => {
            try {
                const genresResponse = await axios.get('/genres');
                const editeursResponse = await axios.get('/editors');
                const auteursResponse = await axios.get('/authors');

                setOptions({
                    genres: genresResponse.data,
                    editeurs: editeursResponse.data,
                    auteurs: auteursResponse.data
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

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

    const handleSelectChange = (event) => {
        const { name, selectedOptions } = event.target;
        setLivre({
            ...livre,
            [name]: Array.from(selectedOptions, option => option.value)
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            title: livre.titre,
            description: livre.description,
            authors: livre.auteurs, // auteurs sélectionnés
            genres: livre.genres, // genres sélectionnés
            editors: livre.editeurs, // éditeurs sélectionnés
            isbn: livre.isbn,
            publicationDate: livre.datePublication,
            stock: parseInt(livre.stock, 10),
            price: parseFloat(livre.prix),
            ebook: livre.estEbook,
            coverImage: livre.image || null,
            altImg: livre.altText
        };

        axios.post('http://localhost:8000/book/add', data)
            .then(response => {
                console.log('Livre ajouté avec succès:', response.data);
                setLivre({
                    image: '',
                    altText: '',
                    titre: '',
                    description: '',
                    auteurs: [],
                    genres: [],
                    editeurs: [],
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
                    <select
                        name="auteurs"
                        multiple
                        value={livre.auteurs}
                        onChange={handleSelectChange}
                    >
                        {options.auteurs.map(auteur => (
                            <option key={auteur.id} value={auteur.id}>
                                {auteur.firstname} {auteur.lastname}
                            </option>
                        ))}
                    </select>
                    <select
                        name="genres"
                        multiple
                        value={livre.genres}
                        onChange={handleSelectChange}
                    >
                        {options.genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    <select
                        name="editeurs"
                        multiple
                        value={livre.editeurs}
                        onChange={handleSelectChange}
                    >
                        {options.editeurs.map(editeur => (
                            <option key={editeur.id} value={editeur.id}>
                                {editeur.name}
                            </option>
                        ))}
                    </select>
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
