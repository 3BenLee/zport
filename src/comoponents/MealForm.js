import React, { Component } from 'react';
import './MealForm.css';

export default class MealForm extends Component {
  onChange = e => {
    this.props.handleMealSelection(e.target.value);
  };

  onNumberChange = e => {
    this.props.handlePeopleCount(e.target.value);
  };

  render() {
    const { mealOptions, numbers } = this.props;

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
        <select className= 'meal-selector' required onChange={this.onChange}>
        <option disabled='disabled' selected>**Select an Restaurant**</option>
          {mealSelections}
        </select>
        <br />
        <h3>Please Select Number of Diners</h3>
        <br />
        <select required onChange={this.onNumberChange}>
          {peopleSelector}
        </select>
        <br />
      </>
    );
  }
}
