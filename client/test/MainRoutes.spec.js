import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router';
import Routes from '../src/components/Navigation/MainRoutes';

describe('>>> <Routes /> --- Shallow Render REACT COMPONENTS', () => {
  
  it('renders correct routes', () => {
    const wrapper = shallow(<Routes />);
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      expect(typeof routeProps.render()).toBe('object');
    //   pathMap[routeProps.path] = routeProps.component;
    //   return pathMap;
    }, {});
    // // { 'nurse/authorization' : NurseAuthorization, ... }
    // expect(pathMap['/']).toBe('BodyContainer');
  });
});