import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import axios from 'axios';

import store from './store';
import MainRoutes from './components/Navigation/MainRoutes.jsx';
import LeftMenuContainer from './containers/LeftMenuContainer.jsx';
import FolderList from './components/FolderList.jsx';
import FolderContainer from './containers/FolderContainer.jsx';
import AppContainer from './containers/AppContainer.jsx';

import io from 'socket.io-client';
const socket = io();

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { setAccountDetails } = this.props;

    //do account call - start server listening to deltas
    axios.get('/api/account').then( userAccount => { 
      console.log(userAccount, 'USERACCOUNT');
      setAccountDetails(userAccount.data, window.token);
      window.token = null;
    })
    .catch( err => {
      console.log('Error getting account info:', err);
    });

    //start listening to deltas
    socket.on('connect', () => {
      console.log('socket connected!');

      socket.on('delta', (delta) => {
        console.log('Delta received - id:', delta.attributes.id, '/ event:', delta.event);
        //refresh messages
        axios.get('/api/messages/').then( messages => {
          setRetrievedMessages(parseMessage(messages.data, today));
          console.log('DELTA RETRIEVE OF MESSAGES DONE')
        })
        .catch( err => {
          console.log('Error getting messages: ', err);
        });
      });
    });
  }

  render() {
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
}

console.log('APPPPP===', App)
export default App;