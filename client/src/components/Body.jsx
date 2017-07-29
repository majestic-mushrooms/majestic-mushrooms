import React from 'react';
import { Divider} from 'semantic-ui-react';
import axios from 'axios';

import EmailListContainer from '../containers/EmailListContainer.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import { parseMessage } from './utils/messagesHelper';
import { today } from './utils/dateTimeHelper';
import UserMessage from './UserMessage.jsx';


class Body extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const { setRetrievedMessages } = this.props;

    axios.get('/api/messages/').then( messages => {
      setRetrievedMessages(parseMessage(messages.data, today));
    })
    .catch( err => {
      console.log('Error getting messages: ', err);
    });
  }


  render() {
    return (
      <div>
        <Divider hidden />
        <SearchContainer style={{marginBottom: '20px'}}/>
        <Divider hidden />
        { this.props.location.messageSent && 
        <div> 
          <UserMessage view={'DisplayMessage'} message={ 
          {
            title: 'Success!',
            body: 'Your message has been successfully sent..',
            color: 'green'
          }
          }/>
          <Divider hidden />
        </div>
        }
        <EmailListContainer style={{border: '0'}}/>
      </div>
    );
  }
}

export default Body;