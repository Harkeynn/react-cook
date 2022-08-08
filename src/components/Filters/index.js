import React, { useState } from 'react';
import "./Filters.scss";

const Filters = ({ categories, origins, onSelectFilter }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <button onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Less' : 'More'} filters
      </button>
      {
        showFilters && (
          <div>
            <ul className="filters-list">
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => onSelectFilter(['categories', category])}
                >{category}</li>
              ))}
            </ul>
            <ul className="filters-list">
              {origins.map((origin, index) => (
                <li
                  key={index}
                  onClick={() => onSelectFilter(['origins', origin])}
                >{origin}</li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default Filters;
