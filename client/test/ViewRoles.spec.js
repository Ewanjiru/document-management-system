import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { ViewRoles } from '../components/roles/ViewRoles';

function setup() {
  const props = {
    loadRoles: jest.fn()
  };

  const wrapper = mount(<ViewRoles {...props} />);

  return {
    props,
    wrapper
  };
}

describe('The documents create form component', () => {
  const { wrapper } = setup();
  it('wraps the content under a div with .wrapper class', () => {
    const div = wrapper.find('.wrapper');
    expect(div.length).toBe(1);
  });

  it('should call onchange onkeyup', () => {
    sinon.spy(CreateForm.prototype, 'onchange');
    wrapper.find('textarea').simulate('change');
    expect(CreateForm.prototype.onchange.calledOnce).toEqual(true);
  });

  it('should call create onclick', () => {
    sinon.spy(CreateForm.prototype, 'create');
    wrapper.find('submit').simulate('click');
    expect(CreateForm.prototype.create.calledOnce).toEqual(true);
  });
});
