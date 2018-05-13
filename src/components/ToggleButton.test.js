import React from 'react';
import { mount, shallow, enzyme } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {sinon, spy, stub} from 'sinon';
import ToggleButton from './ToggleButton';

configure({ adapter: new Adapter() });

describe(ToggleButton, () => {
    const mockOnChange = jest.fn();
    const component = shallow(<ToggleButton initialChecked={true} onChange={mockOnChange}/>);

    it('renders and matches our snapshot', () => {
        const component = renderer.create(<ToggleButton />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("contains input and label", () => {
        expect(component.find("input")).toHaveLength(1);
        expect(component.find("label")).toHaveLength(1);
    });

    it("has checked state true", () => {
        expect(component.state('checked')).toEqual(true);
    });

    it("change checked state of checkbox on setState", () => {
        const wrapper = shallow(<ToggleButton initialChecked={true}/>);
        wrapper.setProps({ checked: true });
        let checkbox = wrapper.find({ type: 'checkbox' });
        expect(checkbox.props().checked).toEqual(true);
        wrapper.setState({ checked: false });
        checkbox = wrapper.find({ type: 'checkbox' });
        expect(checkbox.props().checked).toEqual(false);
    });
});