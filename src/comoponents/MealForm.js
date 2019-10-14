import React, { Component } from 'react';
import { Cascader, InputNumber, Button } from 'antd';

export default class MealForm extends Component {


  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  onChange = (value) => {
    console.log('onChange', value)
    this.props.handleMealChange(value)
  }

  render() {

    const { selectedMeal, mealOptions, people } = this.props;

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
          // onChange={handleChange('selectedMeal')}
        />
        <br/>
        <Button
          type='primary'
          onClick={this.continue}
        >
          Primary
        </Button>
      </>
    )
  }
}
