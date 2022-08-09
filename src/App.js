import axios from 'axios';
import { useState } from 'react';
import './App.scss';
import Filters from './components/Filters';
import Meal from './components/Meal';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [filters, setFilters] = useState({ categories: [], origins: [] });

  const search = e => {
    e.preventDefault();
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`).then(response => {
      setMeals(response.data.meals);
      const _categories = Array.from(new Set(response.data.meals.map(meal => meal.strCategory)));
      const _origins = Array.from(new Set(response.data.meals.map(meal => meal.strArea)));
      setCategories(_categories);
      setOrigins(_origins);
      setFilters({ categories: [..._categories], origins: [..._origins] });
    });
  };

  const selectMeal = meal => {
    console.log(meal);
  };

  const selectFilter = ([key, value]) => {
    const _filters = { ...filters };
    if (_filters[key].includes(value)) {
      _filters[key].splice(_filters[key].indexOf(value), 1);
    } else {
      _filters[key].push(value);
    }
    setFilters(_filters);
  };

  const filteredMeals = meals?.filter(meal => filters.categories.includes(meal.strCategory) && filters.origins.includes(meal.strArea)) || [];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Cook</h1>
        <form onSubmit={e => search(e)}>
          <input
            className="searchbar"
            type="text"
            defaultValue={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            required
          />
          <button className="search-button">Search</button>
        </form>
        {
          meals.length > 0 && (
            <Filters categories={categories} origins={origins} filters={filters} onSelectFilter={filter => selectFilter(filter)}/>
          )
        }
      </header>
      <span>
        {filteredMeals.length === 0 ? 'No' : filteredMeals.length} result{filteredMeals.length > 1 ? 's' : ''}
      </span>
      <div className="meals-list">
        {filteredMeals.map(meal => (
          <Meal key={meal.idMeal} meal={meal} onSelectMeal={meal => selectMeal(meal)} />
        ))}
      </div>
    </div>
  );
}

export default App;
