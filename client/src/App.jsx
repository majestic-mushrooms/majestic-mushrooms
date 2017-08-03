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
    const { setAccountDetails, setRetrievedMessages, setRetrievedFolders, setInbox, addMessage, modifyMessage, setCurrentFolder } = this.props;

    axios.get('/api/folders').then( response => {
      setRetrievedFolders(response.data);
      let inboxId = null;
      response.data.forEach(folder => {
        if (folder.display_name === 'Inbox') { inboxId = folder.folder_id; }
      });
      setCurrentFolder(inboxId);
      setInbox(inboxId);
    })
    .then(() => axios.get('/api/messages'))
    .then(() => axios.get('/api/folders/' + this.props.folders.inboxId))
    .then( response => { 
      setRetrievedMessages(parseMessage(response.data, today));
    });

    socket.on('connect', () => {
      //do account call - start server listening to deltas
      axios.get('/api/account').then( userAccount => { 
        setAccountDetails(userAccount.data, window.token);
        window.token = null;
      })
      .then(() => {
        console.log('Socket connected!');
        socket.emit('room', this.props.account.email_address);
      });

      socket.on('delta', (delta) => { 
        //DELTA WILL ALWAYS BE A MESSAGE AS OF NOW
        // console.log('Delta received - id:', delta.attributes.message_id, '/ event:', delta.event);

        //refresh messages
        const parsedMessage = parseMessage([delta.attributes], today)[0];
        if (delta.event === 'create') {
          axios.get('/api/folders/' + this.props.folders.currentId).then( response => {
            setRetrievedMessages(parseMessage(response.data, today));
          });
        } else if (delta.event === 'modify') {
          modifyMessage(parsedMessage);
        }
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