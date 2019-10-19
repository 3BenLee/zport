import React, { Component } from 'react';
import { Cascader, Button, InputNumber } from 'antd';
import { dishes } from '../../src/mock-data';
import './DishForm.css';

export default class DishForm extends Component {

  onChange = value => {
    this.props.handleDishSelection(value);
  };

  onNumberChange = value => {
    this.props.handleDishQuantity(value);
  }

  render() {
    const {
      selectedRestaurant,
      handleAddInput,
      handleRemoveInput,
      dishSelectorInputs,
      selectedDishes,
      index
    } = this.props;

    const dishesList = dishes.filter(dish => dish.restaurant.includes(selectedRestaurant));
    const finalDishesList = dishesList.map(item => item.name);
    const formattedDishList = finalDishesList.map(item => ({ value: item, label: item }));

    const cascadeElement = (
      <div key={index}>
        <Cascader
        className='dish-cascader'
        options={formattedDishList}
        onChange={this.onChange}
        placeholder={selectedDishes[index]}
        />
        <InputNumber
          className='dish-number'
          min={1}
          max={10}
          defaultValue={1}
          onChange={this.onNumberChange}
        />
        <Button shape='circle' icon='minus' onClick={() => handleRemoveInput(index)} />
        <br />
      </div>
    );

    return (
      <div className='dish-form'>
        <h3>Select a Dish and quantity</h3>
        <Cascader
          options={formattedDishList}
          onChange={this.onChange}
          placeholder='Please select a dish'
        />
        <InputNumber
          className='dish-number'
          min={1}
          max={10}
          defaultValue={1}
          onChange={this.onNumberChange}
        />
        <br />
        {dishSelectorInputs.map(cascadeElement => cascadeElement)}
        <Button className='add-button' shape='circle' icon='plus' onClick={() => handleAddInput(cascadeElement)}/>
      </div>
    );
  }
}
