import React from 'react';
import { shallow } from 'enzyme';
import Alignment, { AlignmentVariant } from './Alignment';

Object.keys(AlignmentVariant).forEach(type => {
  test(`Position ${type}`, () => {
    const view = shallow(<Alignment variant={type}>content</Alignment>);
    expect(view).toMatchSnapshot();
  });
});
