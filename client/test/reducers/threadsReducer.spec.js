import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {threadsReducer} from '../../src/reducers/threadsReducer.js';


describe('>>>R E D U C E R --- Test SET_CURRENT_THREAD',()=>{

    it('+++ reducer for ', () => {
        var a = 1;
        var b = 1;
        expect(a === b);
    });

});