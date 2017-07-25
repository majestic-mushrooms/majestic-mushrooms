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
    const { setRetrievedMessages } = this.props;
  
    axios.get('/api/messages/').then(response => {
      setRetrievedMessages(parseMessage(response.data, today).reverse());
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