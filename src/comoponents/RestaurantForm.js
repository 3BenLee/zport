import React from 'react';
import { dishes } from '../../src/mock-data';
import './RestaurantForm.css';

const RestaurantForm = (props) => {

  const availableRestaurants = dishes.filter(dish => dish.availableMeals.includes(props.selectedMeal));
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
      <select
        className='restaurant-selector'
        required
        name='selectedRestaurant'
        onChange={props.handleSelection}
      >
      <option disabled='disabled' selected>**Select an Restaurant**</option>
        {restaurantSelections}
      </select>
      <br />
    </>
  );
}

export default RestaurantForm;
