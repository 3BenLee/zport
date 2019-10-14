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
    selectedRestaurant: '',
    dish: '',
    selectedDishes: [],
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({step: step + 1});
  }

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({step: step - 1});
  }

  handleMealSelection = (val) => {
    this.setState({ selectedMeal: val[0] });
  }

  handlePeopleCount = (val) => {
    // this.setState({people: val})
    console.log('people', val);
  }

  handleRestaurantSelection = (val) => {
    this.setState({ selectedRestaurant: val[0] });
  }

  handleDishSelection = (val) => {
    this.setState(prevState => ({
      selectedDishes: [...prevState.selectedDishes, val]
    }));
  }
  // this.setState(prevState => ({
  //   tasks: [...prevState.tasks, newTask]
  // }));

  render() {

    console.log('updated state', this.state)
    const { step, selectedMeal, people, selectedRestaurant, selectedDishes } = this.state;

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
            handleRestaurantSelection={this.handleRestaurantSelection}
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
            selectedRestaurant={selectedRestaurant}
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
