import React from 'react';
import { Route, Switch } from 'react-router-dom'

//Import components
import Main from '../Main.jsx';
import FolderList from '../FolderList.jsx';
import ReadEmail from '../ReadEmail.jsx';


//Associate each route URL path with a component
const routes = [
  { path:          '/',
    exact:         true,
    component:     Main
  },
  { path:          '/test',
    exact:         true,
    component:     FolderList
  },
  { path:          '/hello',
    exact:         true,
    component:     ReadEmail
  }
];

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

const Routes = (props) => (
  <Switch>
    {console.log('Rendering Routes', props)}
    {routes.map((route, index) => {
      return <PropsRoute
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />}
    )}
  </Switch>
);

export default Routes;
