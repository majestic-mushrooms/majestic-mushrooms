import React from 'react';
import { Route, Switch } from 'react-router-dom'
import BodyContainer from '../../containers/BodyContainer.jsx';
import ComposeMessage from '../ComposeMessage.jsx';
import ReadMail from '../ReadMail.jsx';
import ReadMailContainer from '../../containers/ReadMailContainer.jsx';
import { withRouter } from 'react-router';

//Associate each route URL path with a component
const routes = [
  { path:          '/',
    exact:         true,
    component:     BodyContainer
  },
  { path:          '/authenticated',
    exact:         true,
    component:     BodyContainer
  },
  { path:          '/compose',
    exact:         true,
    component:     ComposeMessage
  },
  { path:          '/message',
    exact:         true,
    component:     ReadMailContainer
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