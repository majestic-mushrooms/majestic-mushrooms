import React from 'react';
import { Divider} from 'semantic-ui-react';
import EmailListContainer from '../containers/EmailListContainer.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import axios from 'axios';
import { parseMessage } from './utils/messagesHelper';
import { today } from './utils/dateTimeHelper';


class Body extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
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
        <EmailListContainer style={{border: '0'}}/>
      </div>
    );
  }
}

export default Body;