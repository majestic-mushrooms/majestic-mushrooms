import React from 'react';
import { Route, Switch } from 'react-router-dom'
import BodyContainer from '../../containers/BodyContainer.jsx';
import ComposeEmailContainer from '../../containers/ComposeEmailContainer.jsx';
import ReadEmailContainer from '../../containers/ReadEmailContainer.jsx';
import ContactContainer from '../../containers/ContactContainer.jsx';

import { withRouter } from 'react-router';

//Associate each route URL path with a component
const routes = [
  { path:          '/',
    exact:         true,
    component:     BodyContainer
  },
  { path:          '/compose',
    exact:         true,
    component:     ComposeEmailContainer
  },
  { path:          '/message',
    exact:         true,
    component:     ReadEmailContainer
  },
  { path:          '/contacts',
    exact:         true,
    component:     ContactContainer
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

const MainRoutes = (props) => (

  <Switch>
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

export default withRouter(MainRoutes);