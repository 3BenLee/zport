import React, { Component } from 'react';
import { Button } from 'antd';
import { dishes } from '../../src/mock-data';
import './DishForm.css';

export default class DishForm extends Component {
  onChange = e => {
    this.props.handleAddDish(e.target.value);
  };

  onNumberChange = e => {
    /**
     * Commented to allow the app to continue to Step 4.
     */
    // this.props.handleQuantity(e.target.value);
  };

  render() {
    const { selectedRestaurant, selectedDishes, numbers } = this.props;

    const dishesList = dishes.filter(dish => dish.restaurant.includes(selectedRestaurant));
    const filteredDishesList = dishesList.map(item => item.name);

    const RestaurantDishList = filteredDishesList.map((dish, i) => (
      <option key={i} value={dish}>
        {dish}
      </option>
    ));

    const quantitySelector = numbers.map((number, i) => (
      <option key={i} value={number}>
        {number}
      </option>
    ));

    return (
      <>
        {selectedDishes.map((item, i) => (
          <div className='dishes' key={i}>
            <select className='dish' required key={`${item}-${i}`} onChange={this.onChange}>
              {RestaurantDishList}
            </select>
            <select required key={i++} onChange={this.onNumberChange}>
              {quantitySelector}
            </select>
          </div>
        ))}
        <br />
        <Button className='add-button' shape='circle' icon='plus' onClick={() => this.props.handleAddInput()} />
      </>
    );
  }
}
