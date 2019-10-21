import React, { Component } from 'react';
import MealForm from './MealForm';
import RestaurantForm from './RestaurantForm';
import DishForm from './DishForm';
import ConfirmationForm from './ConfirmationForm';
import { Button } from 'antd';
import './BaseForm.css';

export default class BaseForm extends Component {
  state = {
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    step: 1,
    selectedMeal: '',
    people: 0,
    selectedRestaurant: '',
    selectedDishes: [{ dish: '', quantity: 0 }],
    errorOne: false,
    errorTwo: false
  };

  /** Proceed to next step */
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  /** Go back to previous step */
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleMealSelection = value => {
    this.setState({ selectedMeal: value });
  };

  handlePeopleCount = value => {
    this.setState({ people: value });
  };

  handleRestaurantSelection = value => {
    this.setState({ selectedRestaurant: value });
  };

  handleAddInput = () => {
    this.setState(prevState => ({
      selectedDishes: [...prevState.selectedDishes, { dish: '', quantity: 0 }]
    }));
  };

  /**
   * This part (Step 3) gave me some trouble.
   */
  handleAddDish = val => {
    this.setState(prevState => ({
      selectedDishes: [...prevState.selectedDishes, { dish: val, quantity: 0 }]
    }));
  };

  /**
   * Couldn't quite get this part to work so I commented it to allow
   * the app to continue to step 4.
   */
  // handleQuantity = (val) => {
  //   console.log('val', val)
  //   this.setState(prevState => ({
  //     selectedDishes: [...prevState.selectedDishes, { dish: '', quantity: val }]
  //   }));
  // }

  /** Input Validation */
  validateInputs() {
    const { step, selectedMeal, people, selectedRestaurant, selectedDishes } = this.state;

    const inputComplete = () => {
      this.setState({ errorOne: false });
      this.setState({ errorTwo: false });
      this.nextStep();
    };

    const dishesArray = selectedDishes.map(dish => dish.dish);

    switch (step) {
      case 1:
        return selectedMeal && people ? inputComplete() : this.setState({ errorOne: true });
      case 2:
        return !selectedRestaurant ? this.setState({ errorOne: true }) : inputComplete();
      case 3:
        if (!selectedDishes.length) {
          return this.setState({ errorOne: true });
        } else if (new Set(dishesArray).size !== dishesArray.length) {
          return this.setState({ errorTwo: true });
        } else {
          return inputComplete();
        }
      default:
        return '';
    }
  }

  renderSteps() {
    const {
      step,
      numbers,
      selectedMeal,
      people,
      selectedRestaurant,
      selectedDishes,
      dishQuantity,
      dishSelectorInputs,
      index
    } = this.state;

    const backButton = (
      <Button className='nav-button' type='primary' onClick={(step === 2) | 3 | 4 && this.prevStep}>
        Back
      </Button>
    );

    switch (step) {
      case 1:
        const mealOptions = ['breakfast', 'lunch', 'dinner'];
        return (
          <>
            <MealForm
              handleMealSelection={this.handleMealSelection}
              handlePeopleCount={this.handlePeopleCount}
              mealOptions={mealOptions}
              numbers={numbers}
            />
            <Button className='nav-button' type='primary' onClick={() => this.validateInputs(1)}>
              Next
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <RestaurantForm handleRestaurantSelection={this.handleRestaurantSelection} selectedMeal={selectedMeal} />
            {backButton}
            <Button className='nav-button' type='primary' onClick={() => this.validateInputs(2)}>
              Next
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <DishForm
              handleAddDish={this.handleAddDish}
              handleAddInput={this.handleAddInput}
              handleRemoveInput={this.handleRemoveInput}
              selectedMeal={selectedMeal}
              dishSelectorInputs={dishSelectorInputs}
              selectedRestaurant={selectedRestaurant}
              numbers={numbers}
              index={index}
              selectedDishes={selectedDishes}
            />
            {backButton}
            <Button className='nav-button' type='primary' onClick={() => this.validateInputs(3)}>
              Next
            </Button>
          </>
        );
      case 4:
        return (
          <>
            <ConfirmationForm
              submit={this.handleSubmit}
              selectedMeal={selectedMeal}
              people={people}
              dishQuantity={dishQuantity}
              selectedRestaurant={selectedRestaurant}
              selectedDishes={selectedDishes}
            />
            {backButton}
            <Button
              className='nav-button'
              type='primary'
              onClick={() => console.log('Complete!', selectedMeal, people, selectedRestaurant, selectedDishes)}
            >
              Submit
            </Button>
          </>
        );
      default:
        return '';
    }
  }

  render() {
    const { step, errorOne, errorTwo } = this.state;
    const errorMessageOne = errorOne && <h3 className='error'>Please make sure to complete all inputs</h3>;

    const errorMessageTwo = errorTwo && (
      <>
        <h3 className='error'>Please do not enter the same meal more than once</h3>
        <br />
        <h3 className='error'>Just enter dish selection once and increase the quantity</h3>
      </>
    );

    const multiStepper = (
      <div className='stepper'>
        <Button type={step === 1 ? 'primary' : 'default'}>Step 1</Button>
        <Button type={step === 2 ? 'primary' : 'default'}>Step 2</Button>
        <Button type={step === 3 ? 'primary' : 'default'}>Step 3</Button>
        <Button type={step === 4 ? 'primary' : 'default'}>Step 4</Button>
      </div>
    );

    return (
      <>
        {multiStepper}
        {this.renderSteps()}
        {errorMessageOne}
        {errorMessageTwo}
      </>
    );
  }
}
