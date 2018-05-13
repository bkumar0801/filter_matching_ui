import React from 'react';
import { shallow, enzyme } from 'enzyme';
import RangeSlider from './RangeSlider';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {sinon, spy, stub} from 'sinon';

configure({ adapter: new Adapter() });

describe(RangeSlider, () => {
    const mockOnInput = jest.fn();
    const component = shallow(<RangeSlider initialValue = {20}  min = {18} max = {95} onInput={mockOnInput} />); 

    it('renders and matches our snapshot', () => {
        const component = renderer.create(<RangeSlider />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("contains input and output", () => {
        expect(component.find("input")).toHaveLength(1);
        expect(component.find("output")).toHaveLength(1);
    });

    it("has state set", () => {
        expect(component.state('value')).toEqual(20);
        expect(component.state('min')).toEqual(18);
        expect(component.state('max')).toEqual(95);
    });

    it('change value of range on setState', () => {
        const wrapper = shallow(<RangeSlider initialValue = {20}  min = {18} max = {95}/>);
        let range = wrapper.find({ type: 'range' });
        expect(range.props().value).toEqual(20);
        wrapper.setState({ value: 40 });
        range = wrapper.find({ type: 'range' });
        expect(range.props().value).toEqual(40);
    });
});