import React, { Component } from 'react';
import { Cascader, InputNumber } from 'antd';
import './MealForm.css';

export default class MealForm extends Component {

  onChange = (value) => {
    this.props.handleMealSelection(value)
  }

  onNumberChange = (value) => {
    this.props.handlePeopleCount(value)
  }

  render() {

    const { mealOptions, selectedMeal, people } = this.props;

    return (
      <>
        <div className='mealWrapper'>
        <h3 className='meal'>Please Select a Meal</h3>
        <Cascader
          options={mealOptions}
          allowClear={false}
          onChange={this.onChange}
          placeholder={selectedMeal}
        />
        </div>
        <br/>
        <h3>Please Select Number of Diners</h3>
        <br/>
        <InputNumber
          min={1} max={10}
          defaultValue={people}
          onChange={this.onNumberChange}
        />
      </>
    )
  }
}
