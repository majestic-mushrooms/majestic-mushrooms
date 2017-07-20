import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Import components
import ReadMail from './ReadMail.jsx';
import Main from '../Main.js';

//Associate each route URL path with a component
const routes = [
  { path: '/',
    exact: true,
    component: Main
  },
  { path: '/ReadMail',
    exact: true,
    component: ReadMail
  }
];


const Navigation = (props) => (
  <Switch>
    {console.log('Rendering Navigation')}
    {routes.map((route, index) => {
      return <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
 ;}
    )}
  </Switch>
);

export default Navigation;
