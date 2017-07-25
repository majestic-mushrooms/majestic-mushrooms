import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, browserHistory } from 'react-router-dom';
import MainRoutes from './components/Navigation/MainRoutes.jsx';
import LeftMenuContainer from './containers/LeftMenuContainer.jsx';
import FolderList from './components/FolderList.jsx';
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import store from './store';
import FolderContainer from './containers/FolderContainer.jsx';
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

const App = () => {

    return (
      <div>
      <Router history={browserHistory} >
        <Grid >
          <Grid.Row>
            <Grid.Column width={1}>
              <LeftMenuContainer /> 
            </Grid.Column>

            <Grid.Column width={11} style={{marginLeft: '25px'}} >
              <MainRoutes />
            </Grid.Column> 

            <Grid.Column className='foldersTable' width={3}>
              <FolderContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Router>
      </div>
    );
  
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);