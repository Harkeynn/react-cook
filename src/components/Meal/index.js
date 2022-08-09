import { CSSTransition } from 'react-transition-group';
import "./Meal.scss";
import "../../_animations.scss";
import { useRef, useState } from 'react';

const Meal = ({ meal }) => {
  const [showRecipe, setShowRecipe] = useState(false);

  const nodeRef = useRef(null);
  // Get the ingredients of the recipe
  const ingredients = Object.keys(meal)
    .filter(key => key.startsWith('strIngredient') && meal[key]?.length > 0)
    .map(key => {
      // Get the index of the ingredient to retrieve the matching measure
      const match = key.match(/^strIngredient(\d{1,2})$/);
      return (
        <span><b>{meal[key]}</b> - {meal[`strMeasure${match[1]}`]}</span>
      )
    });

  const closeRecipe = e => {
    e.stopPropagation();
    setShowRecipe(!showRecipe);
  };

  return (
    <div className="meal-card" onClick={() => setShowRecipe(true)}>
      <h2>{meal.strMeal}</h2>
      <h3>Origin : {meal.strArea}</h3>
      <span
        className="meal-category"
        onClick={e => closeRecipe(e)}
      >{showRecipe ? 'x' : meal.strCategory}</span>
      <img src={meal.strMealThumb} alt={`${meal.strMeal} illustration`} />
      <CSSTransition
        in={showRecipe}
        timeout={0}
        classNames="slide-up"
        nodeRef={nodeRef}
      >
        <div className="meal-recipe-container slide-up-exit-done" ref={nodeRef}>
          <h3
            style={{backgroundImage: `url(${meal.strMealThumb})`}}
          >
            <span>{meal.strMeal}</span>
          </h3>
          <div className="meal-recipe">
            <h4>Ingredients</h4>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4>Instructions</h4>
            <p>
              {meal.strInstructions}
            </p>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Meal;
