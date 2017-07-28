import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {queryMessageDetails} from '../../../src/components/utils/messagesHelper.js'


describe('>>> <div /> --- Shallow Render REACT COMPONENTS', () => {
    let wrapper 
    beforeEach(()=>{
        wrapper = shallow(<div />)
    })

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1);
    });

});
