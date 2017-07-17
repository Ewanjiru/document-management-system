import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { Header } from '../components/common/Header';
import authenticate from '../api/helper';

function setup() {
  const props = {
    LogoutAction: jest.fn()
  };

  const wrapper = mount(<Header {...props} />);

  return {
    props,
    wrapper
  };
}

describe('The Header', () => {
  it('has a header div', () => {
    const { wrapper } = setup();
    const headerDiv = wrapper.find('div');
    expect((headerDiv).length).toBe(2);
  });
});
