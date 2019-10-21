import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MealForm from './MealForm';

configure({ adapter: new Adapter() });

describe('MealForm', () => {
  const mealOptions = ['breakfast', 'lunch', 'dinner'];

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should render 3 br elements', () => {
    const wrapper = shallow(<MealForm mealOptions={mealOptions} numbers={numbers} />);
    expect(wrapper.find('br')).toHaveLength(3);
  });

  it('should render 2 select elements', () => {
    const wrapper = shallow(<MealForm mealOptions={mealOptions} numbers={numbers} />);
    expect(wrapper.find('select')).toHaveLength(2);
  });
});
