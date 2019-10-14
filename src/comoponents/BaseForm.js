import React, { Component } from 'react';
import MealForm from './MealForm';
import RestaurantForm from './RestaurantForm';
import DishForm from './DishForm';
import ConfirmationForm from './ConfirmationForm';

export default class BaseForm extends Component {
  state = {
    step: 1,
    selectedMeal: '',
    people: 1,
    restaurant: '',
    selectedRestaurant: '',
    dish: '',
    selectedDishes: '',
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({step: step + 1})
  }

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({step: step - 1})
  }

  // Handle field's change
  // handleChange = (input) => (e) => {
  //   this.setState({[input]: this.state.selectedMeal});
  //   console.log('State', this.state);
  // }
  handleMealSelection = (val) => {
    console.log('value', val[0])
    this.setState({ selectedMeal: val[0] });
    console.log('updated state', this.state)
  }

  render() {

    const { step } = this.state;
    const { selectedMeal, people, restaurant, selectedRestaurant, dish, selectedDishes } = this.state;
    const values = { selectedMeal, people, restaurant, dish };

    switch(step) {
      case 1:
        const mealOptions = [
          {value: 'breakfast', label: 'breakfast'},
          {value: 'lunch', label: 'lunch'},
          {value: 'dinner', label: 'dinner'}
        ];
        return (
          <MealForm
            nextStep={this.nextStep}
            handleMealSelection={this.handleMealSelection}
            selectedMeal={selectedMeal}
            mealOptions={mealOptions}
            people={people}
          />
        )
      case 2:
        return (
          <RestaurantForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleRestaurantSelection={this.handleMealSelection}
            selectedMeal={selectedMeal}
          />
        )
      case 3:
        return (
          <DishForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleDishSelection={this.handleDishSelection}
            selectedMeal={selectedMeal}
          />
        )
      case 4:
        return (
          <ConfirmationForm
            submit={this.handleSubmit}
            prevStep={this.prevStep}
            selectedMeal={selectedMeal}
            people={people}
            selectedRestaurant={selectedRestaurant}
            selectedDishes={selectedDishes}
          />
        )
      default:
        return ''
    }
  }
}
