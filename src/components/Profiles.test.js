import React from 'react';
import { shallow, enzyme } from 'enzyme';
import Profiles from './Profiles';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {sinon, spy, stub} from 'sinon';

configure({ adapter: new Adapter() });

describe(Profiles, () => {
    const mockOnInput = jest.fn();
    const emptyProfiles = []
    const profiles = [{
        displayName: "Test",
        job: "Engineer",
        age: "Age: 18 yrs",
        height: "Height: 100 cm",
        photo: "test pic",
        religion: "Religion: Hindu",
        city: "City: Test",
        contact: "Contacts Exchanged: 2",
        favourite: "Favourite: True",
        score: "Compatibility Score: 90%"
      },
    ];
    const component = shallow(<Profiles profiles = {profiles} />); 

    it('renders and matches our snapshot with empty profile', () => {
        const component = renderer.create(<Profiles profiles = {emptyProfiles}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders and matches our snapshot with one profile', () => {
        const component = renderer.create(<Profiles profiles = {profiles}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});