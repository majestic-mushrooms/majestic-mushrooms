import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Body from '../Body.jsx';
import ComposeMessage from '../ComposeMessage.jsx';
import ReadMail from '../ReadMail.jsx';
import { withRouter } from 'react-router';

//Associate each route URL path with a component
const routes = [
  { path:          '/',
    exact:         true,
    component:     Body
  },
  { path:          '/authenticated',
  exact:         true,
  component:     Body
  },
  { path:          '/compose',
    exact:         true,
    component:     ComposeMessage
  },
  { path:          '/message',
    exact:         true,
    component:     ReadMail
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

export default withRouter(MainRoutes);