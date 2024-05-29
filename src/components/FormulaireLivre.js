import React, { useState } from 'react';
import './FormulaireLivre.css'; 

function FormulaireLivre() {
    const [livre, setLivre] = useState({
        image: '',
        altText: '',
        titre: '',
        description: '',
        auteur: '',
        prix: '',
        isbn: '',
        datePublication: '',
        stock: '',
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
            setLivre({...livre, image: reader.result});
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(livre);
        // Ajoutez ici la logique pour envoyer les données au serveur
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
                    name="auteur"
                    placeholder="Auteur"
                    value={livre.auteur}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="prix"
                    placeholder="Prix"
                    value={livre.prix}
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
                <label className="switch-container">
                <span>eBook:</span>
                <label className="switch">
                <input
                type="checkbox"
                checked={livre.estEbook}
                onChange={handleInputChange}
                name="estEbook"/>
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
