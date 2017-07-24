import React from 'react';
import { Divider} from 'semantic-ui-react';
import ListContainer from '../containers/ListContainer.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import axios from 'axios';
import parseMessages from './utils/messagesParser';
import { today } from './utils/dateTimeHelper';


class Body extends React.Component {
  constructor(props) {
    super(props);

  }


  componentDidMount() {
    const { setRetrievedMessages } = this.props;
  
    axios.get('/api/messages/').then(response => {
      setRetrievedMessages(parseMessages(response.data, today));
    });
  }



  render() {
    console.log('*******Inside List.jsx render() ');
    return (
      <div>
        <Divider hidden />
        <SearchContainer style={{marginBottom: '20px'}}/>
        <Divider hidden />
        <ListContainer style={{border: '0'}}/>
      </div>
    );
  }
}

export default Body;