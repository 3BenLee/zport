import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RestaurantForm from './RestaurantForm';

configure({ adapter: new Adapter() });

describe('RestaurantForm', () => {
  const finalRestaurantList = ['In and Out', 'Shake Shack', 'Yoshinoya'];

  it('should render 1 br', () => {
    const wrapper = shallow(<RestaurantForm finalRestaurantList={finalRestaurantList} />);
    expect(wrapper.find('br')).toHaveLength(1);
  });

  it('should render 1 select element', () => {
    const wrapper = shallow(<RestaurantForm finalRestaurantList={finalRestaurantList} />);
    expect(wrapper.find('select')).toHaveLength(1);
  });

  it('should render 1 h3 element', () => {
    const wrapper = shallow(<RestaurantForm finalRestaurantList={finalRestaurantList} />);
    expect(wrapper.find('h3')).toHaveLength(1);
  });
});
