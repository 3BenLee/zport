//@flow
import React, { Component } from 'react';
import { Button } from 'antd';
import { dishes } from '../mock-data';
import './DishForm.css';
import type { SelectedDishType } from './BaseForm';

type Props = {
  selectedRestaurant: string,
  selectedDishes: Array<SelectedDishType>,
  selectedMeal: string,
  numbers: Array<number>,
  handleAddDish: Function,
  handleUpdateQuantity: Function,
  handleRemoveField: Function,
  handleAddInput: Function
};

export default class DishForm extends Component<Props> {
  render() {
    const {
      selectedRestaurant,
      selectedDishes,
      selectedMeal,
      numbers,
      handleAddDish,
      handleUpdateQuantity,
      handleRemoveField,
      handleAddInput
    } = this.props;

    const dishesList = dishes.filter(dish => dish.restaurant.includes(selectedRestaurant));
    const dishListByMeal = dishesList.filter(dish => dish.availableMeals.includes(selectedMeal));

    const filteredDishesList = dishListByMeal.map(dish => {
      return {
        dish: dish.name,
        id: dish.id
      };
    });

    const RestaurantDishList = filteredDishesList.map((dish, index) => (
      <option key={index} value={dish.id}>
        {dish.dish}
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
            <select
              name={index}
              className='dish'
              required
              key={`${i.index}-${i.quantity}`}
              onChange={e => handleAddDish(i.index, e.target.value, null)}
            >
              {/* <option disabled='disabled' selected>
                **Select a Dish**
              </option> */}
              {RestaurantDishList}
            </select>
            <select
              name={i.index}
              required
              key={index}
              onChange={e => handleUpdateQuantity(i.index, null, e.target.value)}
            >
              {quantitySelector}
            </select>
            <div className='minus'>
              <Button shape='circle' icon='minus' onClick={() => handleRemoveField(i.index)} />
            </div>
          </div>
        ))}
        <br />
        <Button className='add-button' shape='circle' icon='plus' onClick={handleAddInput} />
      </>
    );
  }
}
