import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DishForm from './DishForm';

configure({ adapter: new Adapter() });

describe('DishForm', () => {
  const selectedDishes = ['pancakes', 'eggs benedict', 'french toast'];
  const filteredDishesList = ['cheeseburger', 'fries', 'chicken sandwich'];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should render one br', () => {
    const wrapper = shallow(
      <DishForm selectedDishes={selectedDishes} filteredDishesList={filteredDishesList} numbers={numbers} />
    );
    expect(wrapper.find('br')).toHaveLength(1);
  });

  it('should render one br', () => {
    const wrapper = shallow(
      <DishForm selectedDishes={selectedDishes} filteredDishesList={filteredDishesList} numbers={numbers} />
    );
    expect(wrapper.find('div')).toHaveLength(3);
  });

  it('should render one br', () => {
    const wrapper = shallow(
      <DishForm selectedDishes={selectedDishes} filteredDishesList={filteredDishesList} numbers={numbers} />
    );
    expect(wrapper.find('select')).toHaveLength(6);
  });
});
