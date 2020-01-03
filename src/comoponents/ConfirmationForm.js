import React, { Component } from 'react';
import { dishes } from '../mock-data';
import { getDishName } from '../helpers/get-dish-name.js'

export default class ConfirmationForm extends Component {
  render() {
    const { selectedDishes, selectedRestaurant, selectedMeal, people } = this.props;
    const dishesData = selectedDishes
      .filter(value => value.dish !== '')
      .map((dish, index) => {
        return (
          <div key={index}>
            <h2>{`Dish: ${getDishName(dish, dishes)}`}</h2>
            <h2>{`Quantity: ${dish.quantity}`}</h2>
          </div>
        );
      });

    return (
      <>
        <h2>{`Meal: ${selectedMeal}`}</h2>
        <br />
        <h2>{`People: ${people}`}</h2>
        <br />
        <h2>{`Restaurant: ${selectedRestaurant}`}</h2>
        <br />
        {dishesData}
      </>
    );
  }
}
