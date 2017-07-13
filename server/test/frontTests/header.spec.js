import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Header } from '../../../client/components/common/Header';

describe('The NewsApp Header', () => {
  it('has a header div', () => {
    const wrapper = shallow(<Header />);
    const headerDiv = wrapper.find('div');
    expect((headerDiv).length).toBe(2);
  });
});
