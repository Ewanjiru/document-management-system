import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './../../../client/components/Header';

describe('The NewsApp Header', () => {
  it('has a header div', () => {
    const wrapper = shallow(<Header />);
    const headerDiv = wrapper.find('div');
    expect(headerDiv.length).toEqual(3);
  });
});
