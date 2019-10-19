import React, { Component } from 'react';
import { Cascader, Button, InputNumber } from 'antd';
import { dishes } from '../../src/mock-data';
import './DishForm.css';

export default class DishForm extends Component {

  onChange = (value, index) => {
    this.props.handleAddDish(value);
    console.log('dish index', index);
  };

  // onNumberChange = value => {
  //   // this.props.handleDishQuantity(value);
  // }

  render() {

    const { quantity, selectedRestaurant, selectedDishes } = this.props;

    const dishesList = dishes.filter(dish => dish.restaurant.includes(selectedRestaurant));
    const finalDishesList = dishesList.map(item => item.name);
    const formattedDishList = finalDishesList.map((item, index) => ({ value: item, label: item, index: index }));

    return (
      <>
        {selectedDishes.map((val, idx) => {
          let dishId = `dish-${idx}`, quantityId = `quantity-${quantity}`
          return (
            <div key={idx}>
              <Cascader
                className='dish'
                options={formattedDishList}
                onChange={this.onChange}
                placeholder='dish'
                id={dishId}
                data-id={idx}
                name={dishId}
              />
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={this.onNumberChange}
                name={quantityId}
                value={selectedDishes[idx].quantity}
                data-id={idx}
                id={quantityId}
                className='dish-number'
              />
              {/* <Button shape='circle' icon='minus' onClick={() => handleRemoveInput(index)} /> */}
              <br />
            </div>
          )}
        )}
       <Button className='add-button' shape='circle' icon='plus' onClick={() => this.props.handleAddInput()}/>
       </>
    );
  }
}
