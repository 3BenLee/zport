import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ConfirmationForm from './ConfirmationForm';

configure({ adapter: new Adapter() });

describe('ConfirmationForm', () => {
  const selectedDishes = [
    { dish: 'pancakes', quantity: 1 },
    { dish: 'eggs benedict', quantity: 2 },
    { dish: 'french toast', quantity: 3 }
  ];

  it('should render 3 line breaks', () => {
    const wrapper = shallow(<ConfirmationForm selectedDishes={selectedDishes} />);
    expect(wrapper.find('br')).toHaveLength(3);
  });

  it('should render 9 h2 elements', () => {
    const wrapper = shallow(<ConfirmationForm selectedDishes={selectedDishes} />);
    expect(wrapper.find('h2')).toHaveLength(9);
  });
});
