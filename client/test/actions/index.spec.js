import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {addInputs,subtractInputs} from '../../src/actions/index.js';

// describe('>>>A C T I O N --- Test calculatorActions',()=>{
//     it('+++ actionCreator addInputs', () => {
//         const add = addInputs(50)
//         expect(add).toEqual({type:"ADD_INPUTS",output:50})
//     });

//     it('+++ actionCreator subtractInputs', () => {
//         const subtract = subtractInputs(-50)
//         expect(subtract).toEqual({type:"SUBTRACT_INPUTS",output:-50})
//     });
// });
// //*******************************************************************************************************


describe('>>> <div /> --- Shallow Render REACT COMPONENTS', () => {
    let wrapper 
    beforeEach(()=>{
        wrapper = shallow(<div />)
    })

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1);
    });
    
});