import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss';
import Filters from './components/Filters';
import Meal from './components/Meal';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [meals, setMeals] = useState([]);
  const [randomMeal, setRandomMeal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [filters, setFilters] = useState({ categories: [], origins: [] });

  const filteredMeals = meals?.filter(meal => filters.categories.includes(meal.strCategory) && filters.origins.includes(meal.strArea)) || [];
  const randomMealIngredients = Object.keys(randomMeal || {})
  .filter(key => key.startsWith('strIngredient') && randomMeal[key]?.length > 0)
  .map(key => {
    const match = key.match(/^strIngredient(\d{1,2})$/);
    return (
      <li><b>{randomMeal[key]}</b> - {randomMeal[`strMeasure${match[1]}`]}</li>
    )
  });

  const search = e => {
    e.preventDefault();
    setRandomMeal(null);
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`).then(response => {
      setMeals(response.data.meals);
      const _categories = Array.from(new Set(response.data.meals.map(meal => meal.strCategory)));
      const _origins = Array.from(new Set(response.data.meals.map(meal => meal.strArea)));
      setCategories(_categories);
      setOrigins(_origins);
      setFilters({ categories: [..._categories], origins: [..._origins] });
    });
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

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`).then(response => {
      console.log(response);
      setRandomMeal(response.data.meals[0]);
    });
  }, [])

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
      {
        randomMeal ? (
          <div>
            <h3>Start searching meals or discover this wonderful recipe :</h3>
            <div className="random-meal">
              <img src={randomMeal.strMealThumb} alt={`${randomMeal.strMeal} illustration`} />
              <h3>{randomMeal.strMeal}</h3>
              <span>Category : {randomMeal.strCategory}</span>
              <span>Origin : {randomMeal.strArea}</span>
              <h4>Ingredients</h4>
              <ul>
                {randomMealIngredients.map(ingredient => ingredient)}
              </ul>
              <h4>Instructions</h4>
              <p>{randomMeal.strInstructions}</p>
            </div>
          </div>
        ) : (
          <div>
            <span>
              {filteredMeals.length === 0 ? 'No' : filteredMeals.length} result{filteredMeals.length > 1 ? 's' : ''}
            </span>
            <div className="meals-list">
              {filteredMeals.map(meal => (
                <Meal key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
