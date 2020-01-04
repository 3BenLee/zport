//@flow
import React, { Component } from 'react';
import MealForm from './MealForm';
import RestaurantForm from './RestaurantForm';
import DishForm from './DishForm';
import ConfirmationForm from './ConfirmationForm';
import { Button } from 'antd';
import './BaseForm.css';
import MultiStepper from './MultiStepper';

type Props = {
  /* ... */
};

type selectDishesType = { index: number, id: string | null, quantity: number };

type State = {
  numbers: Array<number>,
  step: number,
  selectedMeal: string,
  people: number,
  selectedRestaurant: string,
  indexCounter: number,
  selectedDishes: Array<selectDishesType>,
  errorOne: boolean,
  errorTwo: boolean
};

export default class BaseForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      step: 1,
      selectedMeal: '',
      people: 0,
      selectedRestaurant: '',
      indexCounter: 1,
      selectedDishes: [{ index: 0, id: null, quantity: 0 }],
      errorOne: false,
      errorTwo: false
    };
  }

  /** Makes the stepper buttons clickable to navigate to previous steps */
  handleMultiStepper = (index: number) => {
    this.state.step > index && this.setState({ step: index });
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
  /** Handles selections in Step 1 and 2 */
  handleSelection = (e: SyntheticInputEvent<HTMLInputElement>) => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
    this.setState({ selectedDishes: [{ index: 0, id: null, quantity: 0 }] });
  };
  /** Adds a new input field in Step 3 */
  handleAddInput = () => {
    if (this.state.selectedDishes.length === 0) {
      this.setState(prevState => ({
        selectedDishes: [...prevState.selectedDishes, { index: 0, id: null, quantity: 0 }],
        indexCounter: this.state.indexCounter + 1
      }));
    } else {
      this.setState(prevState => ({
        selectedDishes: [...prevState.selectedDishes, { index: this.state.indexCounter, id: null, quantity: 0 }],
        indexCounter: this.state.indexCounter + 1
      }));
    }
  };

  /** Handles Updating the chosen dish and the dish quatities */
  handleUpdateDishes = (index: number, id: string, quantity: string) => {
    console.log('index and value', index, id, quantity);
    const { selectedDishes } = this.state;
    let updatedItem;
    updatedItem = selectedDishes.map(item => {
      if (item.index === index && id) {
        item.id = id;
      }
      if (item.index === index && quantity) {
        item.quantity = quantity;
      }
      return updatedItem;
    });
  };

  /** Remove an input on Step 3 */
  handleRemoveField = (index: number) => {
    const { selectedDishes } = this.state;

    const newState = selectedDishes.filter(item => item.index !== index);
    this.setState({ selectedDishes: [...newState] });
  };

  /** Input Validation */
  validateInputs(num: number) {
    const { step, selectedMeal, people, selectedRestaurant, selectedDishes } = this.state;

    const inputComplete = () => {
      this.setState({ errorOne: false });
      this.setState({ errorTwo: false });
      this.nextStep();
    };

    const dishesArray = selectedDishes.map(dish => dish.id);

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
  /** Render each seperate step form */
  renderSteps() {
    const { step, numbers, selectedMeal, people, selectedRestaurant, selectedDishes } = this.state;

    const backButton = (
      <Button className='nav-button' type='primary' onClick={() => step > 1 && this.prevStep}>
        Back
      </Button>
    );

    switch (step) {
      case 1:
        const mealOptions = ['breakfast', 'lunch', 'dinner'];
        return (
          <>
            <MealForm handleSelection={this.handleSelection} mealOptions={mealOptions} numbers={numbers} />
            <Button className='nav-button' type='primary' onClick={() => this.validateInputs(1)}>
              Next
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <RestaurantForm handleSelection={this.handleSelection} selectedMeal={selectedMeal} />
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
              handleAddDish={this.handleUpdateDishes}
              handleAddInput={this.handleAddInput}
              handleRemoveField={this.handleRemoveField}
              handleUpdateQuantity={this.handleUpdateDishes}
              selectedMeal={selectedMeal}
              selectedRestaurant={selectedRestaurant}
              numbers={numbers}
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
              selectedMeal={selectedMeal}
              people={people}
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
    console.log('state', this.state);
    const { errorOne, errorTwo } = this.state;
    const errorMessageOne = errorOne && <h3 className='error'>Please make sure to complete all inputs</h3>;

    const errorMessageTwo = errorTwo && (
      <>
        <h3 className='error'>Please do not enter the same meal more than once</h3>
        <br />
        <h3 className='error'>Just enter dish selection once and increase the quantity</h3>
      </>
    );

    return (
      <>
        <MultiStepper handleMultiStepper={this.handleMultiStepper} step={this.state.step} />
        {this.renderSteps()}
        {errorMessageOne}
        {errorMessageTwo}
      </>
    );
  }
}
