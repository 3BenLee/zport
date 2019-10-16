import React, { Component } from 'react';
import { Cascader, Button, InputNumber } from 'antd';
import { dishes } from '../../src/mock-data';
import './DishForm.css';

export default class DishForm extends Component {

  onChange = (value) => {
    console.log('onChange', value);
    this.props.handleDishSelection(value);
  }

  render() {

    const { selectedRestaurant,
      handleAddInput,
      handleRemoveInput,
      dishSelectorInputs,
      index
    } = this.props;

    const dishesList = dishes.filter((dish) => (dish.restaurant.includes(selectedRestaurant)));
    const finalDishesList = dishesList.map((item) => (item.name));
    const formattedDishList = finalDishesList.map((item) => ({value: item, label: item}))

    const cascadeElement = (
      <div key={index}>
        <Cascader
          options={formattedDishList}
          onChange={this.onChange}
          placeholder='Please select dish'
        />
        <InputNumber
          min={1} max={10}
          defaultValue={1}
          // onChange={this.onNumberChange}
        />
        <Button
          shape='circle'
          icon= 'minus'
          onClick={() => handleRemoveInput(cascadeElement)}
        />
        <br/>
      </div>
    );

    return (
      <div className='DishForm'>
        <h3>Select a Dish and quantity</h3>
        <Cascader
          options={formattedDishList}
          onChange={this.onChange}
          placeholder='Please select dish'
        />
        <InputNumber
          min={1} max={10}
          defaultValue={1}
          // onChange={this.onNumberChange}
        />
        <br/>
        {dishSelectorInputs.map((cascadeElement, index) => (cascadeElement))}
        <Button
          type='primary'
          onClick={() => handleAddInput(cascadeElement)}        >
          Add a Dish
        </Button>
      </div>
    )
  }
}
