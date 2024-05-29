import React from 'react';
import './Categories.css';

const Categories = ({ onSelectCategory }) => {
    const categories = ['Tous', 'Action', 'Théâtral', 'Poétique', 'Histoire'];

    return (
        <div className="categories">
            {categories.map(category => (
                <button key={category} onClick={() => onSelectCategory(category)}>
                    {category}
                </button>
            ))}
        </div>
    );
};

export default Categories;
