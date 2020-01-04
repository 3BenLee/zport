//@flow
import React from 'react';
import './MealForm.css';

type Props = {
  mealOptions: Array<string>,
  numbers: Array<number>,
  handleSelection: Function
};

const MealForm = (props: Props) => {
  const { mealOptions, numbers, handleSelection } = props;

  const mealSelections = mealOptions.map((meal, i) => (
    <option key={i} value={meal}>
      {meal}
    </option>
  ));

  const peopleSelector = numbers.map((e, i) => (
    <option key={i} value={e}>
      {e}
    </option>
  ));

  return (
    <>
      <h3 className='meal'>Please Select a Meal</h3>
      <select className='meal-selector' name='selectedMeal' required onChange={handleSelection}>
        <option disabled='disabled' selected>
          **Select an Meal**
        </option>
        {mealSelections}
      </select>
      <br />
      <h3>Please Select Number of Diners</h3>
      <br />
      <select required name='people' onChange={handleSelection}>
        {peopleSelector}
      </select>
      <br />
    </>
  );
};

export default MealForm;
