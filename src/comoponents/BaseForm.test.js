import React from 'react';
// import ReactDOM from 'react-dom';
// import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BaseForm from './BaseForm';
// import multiStepper from './BaseForm';

configure({ adapter: new Adapter() })

describe('BaseForm', () => {
  it('should render stuff', () => {
    const wrapper = shallow(<BaseForm />);
    expect(wrapper.find('div')).toHaveLength(1);
  })
})