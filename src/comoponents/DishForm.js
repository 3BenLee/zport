import React, { Component } from 'react';
import { Button } from 'antd';
import { dishes } from '../../src/mock-data';
import './DishForm.css';

export default class DishForm extends Component {
  // onChange = (e, index) => {
  //   e.preventDefault()
  //   console.log('onChange', e.target.value, index)
  //   this.props.handleAddDish(e.target.value, index);
  // };

  // onNumberChange = e => {
  //   /**
  //    * Commented to allow the app to continue to Step 4.
  //    */
  //   // this.props.handleQuantity(e.target.value);
  // };

  render() {
    const { selectedRestaurant,
      selectedDishes,
      numbers,
      handleAddDish,
      handleUpdateQuantity,
      handleAddInput
    } = this.props;

    const dishesList = dishes.filter(dish => dish.restaurant.includes(selectedRestaurant));
    // Here we create an array with just the names of the dishes available
    // at the chosen restaurant
    // This step might be unnecessary???
    const filteredDishesList = dishesList.map(item => item.name);

    const RestaurantDishList = filteredDishesList.map((dish, index) => (
      <option key={index} value={dish.id}>
        {dish}
      </option>
    ));

    const quantitySelector = numbers.map((number, index) => (
      <option key={index} value={number}>
        {number}
      </option>
    ));

    return (
      <>
        {selectedDishes.map((i, index) => (
          <div className='dishes' key={index}>
            <select name={index} className='dish' required key={i} onChange={(e) => handleAddDish(index, e.target.value)}>
              {RestaurantDishList}
            </select>
            <select name={`${index}-${i}`} required key={index} onChange={(e) => handleUpdateQuantity(index, e.target.value)}>
              {quantitySelector}
            </select>
          </div>
        ))}
        <br />
        <Button className='add-button' shape='circle' icon='plus' onClick={handleAddInput} />
      </>
    );
  }
}
