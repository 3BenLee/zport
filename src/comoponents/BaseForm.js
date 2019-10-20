import React, { Component } from 'react';
import MealForm from './MealForm';
import RestaurantForm from './RestaurantForm';
import DishForm from './DishForm';
import ConfirmationForm from './ConfirmationForm';
import { Button } from 'antd';
import './BaseForm.css';

export default class BaseForm extends Component {
  state = {
    step: 1,
    selectedMeal: '',
    people: 1,
    selectedRestaurant: '',
    selectedDishes: [
      // { dish: '',
      //   quantity: '',
      // }
    ],
    errorOne: false,
    errorTwo: false,
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

  handleAddInput = () => {
    console.log('fired')
    this.setState((prevState) => ({
      selectedDishes: [...prevState.selectedDishes, {dish: '', quantity: ''}]
    }));
  }

  handleAddDish = (idx) => {
    // console.log('idx', idx);
    this.setState((prevState) => ({
      selectedDishes: [...prevState.selectedDishes, {dish: idx[0], quantity: ''}]
    }));
  }

  validateInputs() {
    const { step, selectedMeal, people, selectedRestaurant, selectedDishes } = this.state;

    const inputComplete = () => {
      this.setState({ errorOne: false });
      this.setState({ errorTwo: false });
      this.nextStep();
    };

    switch(step) {
      case 1:
        return !selectedMeal || !people ? this.setState({ errorOne: true }) : inputComplete();
      case 2:
        return !selectedRestaurant ? this.setState({ errorOne: true }) : inputComplete();
      case 3:
        if (!selectedDishes.length) {
          return this.setState({ errorOne: true })
        }
        else if (new Set(this.createFlattenedArray()).size !== this.createFlattenedArray().length) {
          return this.setState({ errorTwo: true });
        } else {
          console.log('step 3 complete!')
          return inputComplete();

        }
      default:
        return ''
    }
  };

  renderSteps() {
    const {
      step,
      selectedMeal,
      people,
      selectedRestaurant,
      selectedDishes,
      dishQuantity,
      dishSelectorInputs,
      index
    } = this.state;

    const backButton = (
      <Button className='nav-button' type='primary' onClick={step === 2 | 3 | 4 && this.prevStep}>
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
            <Button className='nav-button' type='primary' onClick={() => this.validateInputs(1)}>Next</Button>
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
            <Button className='nav-button' type='primary' onClick={() => this.validateInputs(2)}>Next</Button>
          </>
        );
      case 3:
        return (
          <>
            <DishForm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleAddDish={this.handleAddDish}
              handleAddInput={this.handleAddInput}
              handleRemoveInput={this.handleRemoveInput}
              selectedMeal={selectedMeal}
              dishSelectorInputs={dishSelectorInputs}
              selectedRestaurant={selectedRestaurant}
              index={index}
              selectedDishes={selectedDishes}
            />
            {backButton}
            <Button className='nav-button' type='primary' onClick={() => this.validateInputs(3)}>Next</Button>
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
              dishQuantity={dishQuantity}
              selectedRestaurant={selectedRestaurant}
              selectedDishes={selectedDishes}
            />
            {backButton}
            <Button className='nav-button' type='primary' onClick={() => (console.log('Complete!', this.state))}>Submit</Button>
          </>
        );
      default:
        return '';
    }
  }

  render() {
    console.log('updated state', this.state);
    const { step, errorOne ,errorTwo } = this.state;
    const errorMessageOne = errorOne && (
      <h3 className='error'>Please make sure to complete all inputs</h3>
    );

    const errorMessageTwo = errorTwo && (
      <>
        <h3 className='error'>Please do not enter the same meal more than once</h3>
        <br/>
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
    )

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
