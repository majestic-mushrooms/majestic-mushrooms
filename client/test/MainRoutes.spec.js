import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router';
import Routes from '../src/components/Navigation/MainRoutes';

it('renders correct routes', () => {
  const wrapper = shallow(<Routes />);
  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
  }, {});
  // { 'nurse/authorization' : NurseAuthorization, ... }

  expect(pathMap['/']).toBe('BodyContainer');
    // var a = 1;
    // var b = 1;
    // expect(a === b);
});