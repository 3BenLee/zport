import React, { Component } from 'react';
import { Cascader, Button } from 'antd';
import { dishes } from '../../src/mock-data';

export default class RestaurantForm extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  goBack = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  onChange = (value) => {
    this.props.handleRestaurantSelection(value)
  }

  render() {

    const availableRestaurants = dishes.filter(dish => dish.availableMeals.includes(this.props.selectedMeal));
    const restaurantList = availableRestaurants.map((item) => (item.restaurant));
    const finalRestaurantList = [...new Set(restaurantList)].map((item) => ({value: item, label: item}));

    return (
      <>
        <h1>Please Select a Restaurant</h1>
        <Cascader
          options={finalRestaurantList}
          onChange={this.onChange}
          placeholder='Please select restaurant'
        />
        <br/>
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