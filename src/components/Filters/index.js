import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import "./Filters.scss";
import "../../_animations.scss";

const Filters = ({ categories, origins, filters, onSelectFilter }) => {
  const [showFilters, setShowFilters] = useState(false);
  const nodeRef = useRef(null);

  return (
    <div className="filters-container">
      <button onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Less' : 'More'} filters
      </button>
      <CSSTransition
        in={showFilters}
        timeout={0}
        classNames="reveal-down"
        nodeRef={nodeRef}
      >
        <div className="filters-list-container reveal-down-exit-done" ref={nodeRef}>
          Categories :
          <ul className="filters-list">
            {categories.map((category, index) => (
              <li
                key={index}
                className={filters?.categories?.includes(category) ? 'active' : ''}
                onClick={() => onSelectFilter(['categories', category])}
              >{category}</li>
            ))}
          </ul>
          Origins :
          <ul className="filters-list">
            {origins.map((origin, index) => (
              <li
                key={index}
                className={filters?.origins?.includes(origin) ? 'active' : ''}
                onClick={() => onSelectFilter(['origins', origin])}
              >{origin}</li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Filters;
