import React, { Component } from 'react';
import { Cascader, Button } from 'antd';
import { dishes } from '../../src/mock-data';

export default class DishForm extends Component {

  state = {
    cascades: []
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
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

    const { selectedRestaurant } = this.props;
    const dishesList = dishes.filter((dish) => (dish.restaurant.includes(selectedRestaurant)));
    const finalDishesList = dishesList.map((item) => (item.name));
    const formattedDishList = finalDishesList.map((item) => ({value: item, label: item}))

    const cascadeElement = (
      <>
        <Cascader
          options={formattedDishList}
          onChange={this.onChange}
          placeholder='Please select dish'
        />
        <Button
          type='primary'
          onClick={this.addInputHandler}
        >
          Another Input
        </Button>
      </>
    );

    return (
      <>
        <h1>Please Select a Dish</h1>
        <Cascader
          options={formattedDishList}
          onChange={this.onChange}
          placeholder='Please select dish'
        />
        <Button
          type='primary'
          onClick={this.addInputHandler}
        >
          Another Input
        </Button>
        <br/>
        {/* {this.state.cascades.map((cascade) => )} */}
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