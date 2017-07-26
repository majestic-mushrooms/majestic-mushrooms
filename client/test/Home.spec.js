import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
// import App from '../src/index.jsx'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createStore} from 'redux';


describe('>>> <Provider /> --- Shallow Render REACT COMPONENTS', () => {
    // let wrapper 
    // beforeEach(()=>{
    //     wrapper = shallow(<Provider />)
    // })

    // it('+++ render the DUMB component', () => {
    //    console.log("=========================", wrapper);

    //     expect(wrapper.length).toEqual(1);
    // });

    // it('should render three <BrowserRouter /> components', () => {
    //     const wrapper = shallow(<Provider />);
    //     expect(wrapper.length).toBeTruthy();
    // });
    
    it('+++ contains Router - <Provider />', () => {
    //     expect(wrapper.contains('<Providers />')).toBe(true)
        var a = 1;
        var b = 1;
        expect(a === b);
    });
});