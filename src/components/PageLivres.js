import React, { useState } from 'react';
import Categories from './categories';
import ProductGrid from './productgrid';
import './PageLivres.css';



const PageLivres = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tous');

    return (
        <div className="page-livres">
            <Categories onSelectCategory={setSelectedCategory} />
            <ProductGrid category={selectedCategory} />
        </div>
    );
};

export default PageLivres;
