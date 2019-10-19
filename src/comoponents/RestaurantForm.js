import React, { Component } from 'react';
import { Cascader } from 'antd';
import { dishes } from '../../src/mock-data';

export default class RestaurantForm extends Component {
  onChange = value => {
    this.props.handleRestaurantSelection(value);
  };

  render() {
    const availableRestaurants = dishes.filter(dish => dish.availableMeals.includes(this.props.selectedMeal));
    const restaurantList = availableRestaurants.map(item => item.restaurant);
    const finalRestaurantList = [...new Set(restaurantList)].map(item => ({ value: item, label: item }));

    return (
      <>
        <h3>Please Select a Restaurant</h3>
        <Cascader options={finalRestaurantList} onChange={this.onChange} placeholder='Please select restaurant' />
        <br/>
      </>
    );
  }
}
