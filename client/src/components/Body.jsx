import React from 'react';
import { Divider} from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import EmailListContainer from '../containers/EmailListContainer.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import { parseMessage } from './utils/messagesHelper';
import { today } from './utils/dateTimeHelper';

const socket = io();

class Body extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const app = this;
    const { setRetrievedMessages, setAccountDetails } = this.props;

    axios.get('/api/account').then( userAccount => { 
      setAccountDetails(userAccount.data, window.token);
      window.token = null;
    })
    .catch( err => {
      console.log('Error getting account info:', err);
    });

    axios.get('/api/messages/').then( messages => {
      setRetrievedMessages(parseMessage(messages.data, today));
      console.log('INTIAL RETRIEVE OF MESSAGES DONE');
    })
    .catch( err => {
      console.log('Error getting messages: ', err);
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
        <Divider hidden />
        <SearchContainer style={{marginBottom: '20px'}}/>
        <Divider hidden />
        <EmailListContainer style={{border: '0'}}/>
      </div>
    );
  }
}

export default Body;