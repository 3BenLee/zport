import React, { Component } from 'react';

export default class ConfirmationForm extends Component {

  render() {
    const { selectedDishes, dishQuantity, selectedRestaurant, selectedMeal, people } = this.props;

    const dishes = selectedDishes.map((dish, index) => {
      return (
      <div key={index}>
      <h2>Dish: {dish}</h2>
      <h2>Quantity: {dishQuantity}</h2>
      </div>
    )})

    return (
      <>
        <h2>Meal: {selectedMeal}</h2>
        <br/>
        <h2>People: {people}</h2>
        <br/>
        <h2>Restaurant: {selectedRestaurant}</h2>
        <br/>
        {dishes}
      </>
    );
  }
}