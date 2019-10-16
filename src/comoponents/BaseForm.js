import React, { Component } from 'react';
import MealForm from './MealForm';
import RestaurantForm from './RestaurantForm';
import DishForm from './DishForm';
import ConfirmationForm from './ConfirmationForm';
import { Button } from 'antd';
import StepZilla from "react-stepzilla";

export default class BaseForm extends Component {
  state = {
    index: 0,
    step: 1,
    selectedMeal: '',
    people: 1,
    selectedRestaurant: '',
    dish: '',
    dishSelectorInputs: [],
    selectedDishes: []
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleMealSelection = val => {
    this.setState({ selectedMeal: val[0] });
  };

  handlePeopleCount = val => {
    this.setState({ people: val });
    console.log('people', val);
  };

  handleRestaurantSelection = val => {
    this.setState({ selectedRestaurant: val[0] });
  };

  handleDishSelection = val => {
    this.setState(prevState => ({
      selectedDishes: [...prevState.selectedDishes, val]
    }));
  };

  handleAddInput = (element, index) => {
    this.setState(prevState => ({
      index: prevState.index + 1
    }));
    this.setState(prevState => ({
      dishSelectorInputs: [...prevState.dishSelectorInputs, element]
    }));
  };

  handleRemoveInput = idx => {
    const newDishSelectorInputs = this.state.dishSelectorInputs.filter(item => {
      return item.key !== idx.toString();
    });
    this.setState({ dishSelectorInputs: [...newDishSelectorInputs] });
  };

  renderSteps() {
    const { step, selectedMeal, people, selectedRestaurant, selectedDishes, dishSelectorInputs, index } = this.state;

    const nextButton = (
      <Button type='primary' onClick={(step === 1) | 2 | 3 && this.nextStep}>
        Next
      </Button>
    );

    const backButton = (
      <Button type='primary' onClick={(step === 2) | 3 | 4 && this.prevStep}>
        Back
      </Button>
    );

    switch (step) {
      case 1:
        const mealOptions = [
          { value: 'breakfast', label: 'breakfast' },
          { value: 'lunch', label: 'lunch' },
          { value: 'dinner', label: 'dinner' }
        ];
        return (
          <>
            <MealForm
              nextStep={this.nextStep}
              handleMealSelection={this.handleMealSelection}
              handlePeopleCount={this.handlePeopleCount}
              selectedMeal={selectedMeal}
              mealOptions={mealOptions}
              people={people}
            />
            {nextButton}
          </>
        );
      case 2:
        return (
          <>
            <RestaurantForm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleRestaurantSelection={this.handleRestaurantSelection}
              selectedMeal={selectedMeal}
            />
            {backButton}
            {nextButton}
          </>
        );
      case 3:
        return (
          <>
            <DishForm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleDishSelection={this.handleDishSelection}
              handleAddInput={this.handleAddInput}
              handleRemoveInput={this.handleRemoveInput}
              selectedMeal={selectedMeal}
              dishSelectorInputs={dishSelectorInputs}
              selectedRestaurant={selectedRestaurant}
              index={index}
              selectedDishes={selectedDishes}
            />
            {backButton}
            {nextButton}
          </>
        );
      case 4:
        return (
          <>
            <ConfirmationForm
              submit={this.handleSubmit}
              prevStep={this.prevStep}
              selectedMeal={selectedMeal}
              people={people}
              selectedRestaurant={selectedRestaurant}
              selectedDishes={selectedDishes}
            />
            {backButton}
            {nextButton}
          </>
        );
      default:
        return '';
    }
  }

  render() {
    console.log('updated state', this.state);

    const steps =
    [
      {name: 'Step 1', component: <MealForm />},
      {name: 'Step 2', component: <RestaurantForm />},
      {name: 'Step 3', component: <DishForm />},
      {name: 'Step 4', component: <ConfirmationForm />}
    ];

    return (
      <>
        <div className='step-progress'>
          <StepZilla steps={steps}/>
        </div>
        {this.renderSteps()}
      </>
    );
  }
}
