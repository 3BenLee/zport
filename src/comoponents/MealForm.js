import React, { Component } from 'react';
import { Cascader, InputNumber } from 'antd';
import './MealForm.css';

export default class MealForm extends Component {
  onChange = value => {
    this.props.handleMealSelection(value);
    this.props.handlePeopleCount(value);
  };

  onNumberChange = value => {
    this.props.handlePeopleCount(value);
  };

  render() {
    const { mealOptions, selectedMeal } = this.props;

    return (
      <>
        <div >
          <h3 className='meal'>Please Select a Meal</h3>
          <Cascader options={mealOptions} allowClear={false} onChange={this.onChange} placeholder={selectedMeal} />
        </div>
        <br />
        <h3>Please Select Number of Diners</h3>
        <br />
        <InputNumber
          className='numberInput'
          min={1}
          max={10}
          defaultValue={1}
          onChange={this.onNumberChange}
        />
        <br />
      </>
    );
  }
}
