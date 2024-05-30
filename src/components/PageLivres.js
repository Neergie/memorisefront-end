import React, { useState } from 'react';
import GrilleProduits from './productgrid';

const PageLivres = () => {
  const [categorieCourante, setCategorieCourante] = useState('Tous');

  const handleChangeCategorie = (categorie) => {
    setCategorieCourante(categorie);
  };

  return (
    <div>
      <h1>Liste des Produits</h1>
      <categorie onChangeCategorie={handleChangeCategorie} />
      <GrilleProduits categorie={categorieCourante} />
    </div>
  );
};

export default PageLivres;
