import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router-dom';
import {BrowserRouter as Router, browserHistory } from 'react-router-dom';
import MainRoutes from './components/Navigation/MainRoutes.jsx';
import LeftMenu from './components/LeftMenu.jsx';
import FolderList from './components/FolderList.jsx';
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

// for redux reducers in index.js
import reducer from './reducers/index.js';
import { createStore } from 'redux';

// for reducers
// let store = createStore(NAME_OF_reducer);

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



class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('WE HAVE A TOKEN IN index.jsx: ', window.token);
  }

  render() {
    return (
    
      <div>
      <Router history={browserHistory} >
        <Grid >
          <Grid.Row>
            <Grid.Column width={1}>
              <LeftMenu /> 
            </Grid.Column>

            <Grid.Column width={11} style={{marginLeft: '25px'}} >
              <MainRoutes />
            </Grid.Column> 

            <Grid.Column className='foldersTable' width={3}>
              <FolderList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Router>
      </div>
   
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));