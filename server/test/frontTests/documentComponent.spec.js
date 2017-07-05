import React from "react";
import { shallow, mount } from "enzyme";
import sinon from 'sinon';
import { CreateForm } from '../../../client/components/documents/CreateForm';

describe("The documents create form component", () => {
  let wrapper;
  it("wraps the content under a div with .wrapper class", () => {
    wrapper = shallow(<CreateForm />);
    const div = wrapper.find('.wrapper');
    expect(div.length).toBe(1);
  });

  // it("should call onchange onkeyup", () => {
  //   sinon.spy(CreateForm.prototype, 'onchange');
  //   wrapper = mount(<CreateForm />);
  //   wrapper.find('textarea').simulate('change');
  //   expect(CreateForm.prototype.onchange.calledOnce).toEqual(true);
  // });

  // it("should call create onclick", () => {
  //   sinon.spy(CreateForm.prototype, 'create');
  //   wrapper = mount(<CreateForm />);
  //   wrapper.find('submit').simulate('click');
  //   expect(CreateForm.prototype.create.calledOnce).toEqual(true);
  // });
})