import React from 'react';
import GrilleProduits from './productgrid';

const PageLivres = () => {
  return (
    <div className="pagelisting-container"> 
      <h1 className='titrelisting'>Nos livres</h1>
      <GrilleProduits booksCount={12} />
    </div>
  );
};

export default PageLivres;
