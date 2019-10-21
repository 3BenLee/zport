import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BaseForm from './BaseForm';
import MealForm from './MealForm';

configure({ adapter: new Adapter() });

describe('BaseForm', () => {
  it('should render a div', () => {
    const wrapper = shallow(<BaseForm />);
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should render the MealForm component', () => {
    const wrapper = shallow(<BaseForm />);
    expect(wrapper.find(MealForm)).toHaveLength(1);
  });

  it('should render 5 buttons', () => {
    const wrapper = shallow(<BaseForm />);
    expect(wrapper.find('Button')).toHaveLength(5);
  });
});
