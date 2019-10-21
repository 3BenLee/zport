import React, { Component } from 'react';
import { dishes } from '../../src/mock-data';
import './RestaurantForm.css';

export default class RestaurantForm extends Component {
  onChange = e => {
    this.props.handleRestaurantSelection(e.target.value);
  };

  render() {
    const availableRestaurants = dishes.filter(dish => dish.availableMeals.includes(this.props.selectedMeal));
    const restaurantList = availableRestaurants.map(item => item.restaurant);
    const finalRestaurantList = [...new Set(restaurantList)];

    const restaurantSelections = finalRestaurantList.map((restaurant, i) => (
      <option key={i} value={restaurant}>
        {restaurant}
      </option>
    ));

    return (
      <>
        <h3>Please Select a Restaurant</h3>
        <select className='restaurant-selector'required onChange={this.onChange}>
        <option disabled='disabled' selected>**Select an Restaurant**</option>
          {restaurantSelections}
        </select>
        <br />
      </>
    );
  }
}
