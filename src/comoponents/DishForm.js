import React, { Component } from 'react';
import { Cascader, Button, InputNumber } from 'antd';
import { dishes } from '../../src/mock-data';

export default class DishForm extends Component {

  state = {
    cascades: []
  }

  continue = e => {
    // e.preventDefault();
    // this.props.nextStep();
    alert("Finished!")
  }

  goBack = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  onChange = (value) => {
    console.log('onChange', value);
    this.props.handleDishSelection(value);
  }

  render() {

    const { selectedRestaurant, handleAddInput, dishSelectorInputs } = this.props;
    const dishesList = dishes.filter((dish) => (dish.restaurant.includes(selectedRestaurant)));
    const finalDishesList = dishesList.map((item) => (item.name));
    const formattedDishList = finalDishesList.map((item) => ({value: item, label: item}))

    // Need to add keys to each element
    const cascadeElement = (
      <div>
        <h1>Please Select a Dish</h1>
        <Cascader
          options={formattedDishList}
          onChange={this.onChange}
          placeholder='Please select dish'
        />
        <h1>Enter Quantity</h1>
        <InputNumber
          min={1} max={10}
          defaultValue={1}
          // onChange={this.onNumberChange}
        />
        <Button
          shape='circle'
          icon={dishSelectorInputs.length === 1 ? 'plus' : 'minus'}
          onClick={() => handleAddInput(cascadeElement)}
        />
        <br/>
      </div>
    );

    return (
      <>
        <h1>Please Select a Dish</h1>
        <Cascader
          options={formattedDishList}
          onChange={this.onChange}
          placeholder='Please select dish'
        />
        <h1>Enter Quantity</h1>
        <InputNumber
          min={1} max={10}
          defaultValue={1}
          // onChange={this.onNumberChange}
        />
        <Button
          shape='circle'
          icon={dishSelectorInputs.length < 2 ? 'plus' : 'minus'}
          onClick={() => handleAddInput(cascadeElement)}
        />
        <br/>
        {dishSelectorInputs.map((cascadeElement, index) => (cascadeElement))}
        <Button
          type='primary'
          onClick={this.continue}
        >
          Next
        </Button>
        <Button
          type='primary'
          onClick={this.goBack}
        >
          Previous
        </Button>
      </>
    )
  }
}