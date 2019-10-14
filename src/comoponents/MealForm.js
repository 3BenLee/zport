import React, { Component } from 'react';
import { Cascader, InputNumber, Button } from 'antd';

export default class MealForm extends Component {


  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  onChange = (value) => {
    this.props.handleMealSelection(value)
  }

  // onNumberChange = (value) => {
  //   console.log('number', value)
  //   this.props.handlePeopleCount(value)
  // }

  render() {

    const { mealOptions } = this.props;

    return (
      <>
        <h1>Please Select a Meal</h1>
        <Cascader
          options={mealOptions}
          onChange={this.onChange}
          placeholder='Please select meal'
        />
        <br/>
        <h1>Please Select Number of Diners</h1>
        <br/>
        <InputNumber
          min={1} max={10}
          defaultValue={1}
          // onChange={this.onNumberChange}
        />
        <br/>
        <Button
          type='primary'
          onClick={this.continue}
        >
          Next
        </Button>
      </>
    )
  }
}
