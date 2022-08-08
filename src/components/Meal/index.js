import "./Meal.scss";

const Meal = ({ meal, onSelectMeal }) => {
  const selectMeal = () => {
    onSelectMeal(meal);
  };

  return (
    <div className="meal-card" onClick={() => selectMeal()}>
      <h2>{meal.strMeal}</h2>
      <h3>Origin : {meal.strArea}</h3>
      <span className="meal-category">{meal.strCategory}</span>
      <img src={meal.strMealThumb} alt={`${meal.strMeal} illustration`} />
    </div>
  );
};

export default Meal;
