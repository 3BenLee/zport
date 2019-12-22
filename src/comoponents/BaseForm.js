import React, { Component } from 'react';
import MealForm from './MealForm';
import RestaurantForm from './RestaurantForm';
import DishForm from './DishForm';
import ConfirmationForm from './ConfirmationForm';
import { Button } from 'antd';
import './BaseForm.css';

export default class BaseForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      step: 1,
      selectedMeal: '',
      people: 0,
      selectedRestaurant: '',
      selectedDishes: [{ index: 0, id: null, quantity: 0 }],
      errorOne: false,
      errorTwo: false
    };
  }

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

  handleSelection = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
    this.setState({selectedDishes: [{ index: 0, id: null, quantity: 0 }]});
  };

  handleAddInput = () => {
    this.setState(prevState => ({
      selectedDishes: [...prevState.selectedDishes, { index: this.state.selectedDishes.length, id: null, quantity: 0 }]
    }));
  };

  handleAddDish = (index, val) => {
    const { selectedDishes } = this.state;
    console.log('handleAddDish', index, val);
    let updatedItem;
    updatedItem = selectedDishes.map((item) => {
      if (item.index === index) {
        item.id = val;
      }
      return updatedItem;
    })
  }

  handleUpdateQuantity = (index, val) => {
    const { selectedDishes } = this.state;
    console.log('handleUpdateQuantity', index, val);
    let updatedItem;
    updatedItem = selectedDishes.map((item) => {
      if (item.index === index) {
        item.quantity = val;
      }
      return updatedItem;
    })
  }

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
      index
    } = this.state;

    const backButton = (
      <Button className='nav-button' type='primary' onClick={step === 2 | 3 | 4 && this.prevStep}>
        Back
      </Button>
    );

    switch (step) {
      case 1:
        const mealOptions = ['breakfast', 'lunch', 'dinner'];
        return (
          <>
            <MealForm
              handleSelection={this.handleSelection}
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
            <RestaurantForm
              handleSelection={this.handleSelection}
              selectedMeal={selectedMeal}
            />
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
              handleUpdateQuantity={this.handleUpdateQuantity}
              selectedMeal={selectedMeal}
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
    console.log('state', this.state)
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
