import React from 'react';
import {BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import axios from 'axios';

import MainRoutes from './components/Navigation/MainRoutes.jsx';
import LeftMenuContainer from './containers/LeftMenuContainer.jsx';
import FolderListContainer from './containers/FolderListContainer.jsx';
import AppContainer from './containers/AppContainer.jsx';
import { parseMessage } from './components/utils/messagesHelper';
import { today } from './components/utils/dateTimeHelper';

// import io from 'socket.io-client';
// const socket = io();

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
    const { setAccountDetails, setRetrievedMessages, setRetrievedFolders } = this.props;
    const getMessages = () => {
      axios.get('/api/messages').then( messages => {
        setRetrievedMessages(parseMessage(messages.data, today));
      })
      .catch( err => {
        console.log('Error getting messages: ', err)
      });
    };

    //do account call - start server listening to deltas
    axios.get('/api/account').then( userAccount => { 
      setAccountDetails(userAccount.data, window.token);
      window.token = null;
    });
    axios.get('/api/folders').then(response => {
      setRetrievedFolders(response.data);
    })

    //retrieve updated messages from db every 3:30
    getMessages();
    setInterval(getMessages, 18300); 
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
              <FolderListContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Router>
      </div>
    );
  }
}

export default App;