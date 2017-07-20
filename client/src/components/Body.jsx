import React from 'react';
import SearchBar from './SearchBar.jsx';
import RightMenu from './RightMenu.jsx';
import { Divider, Segment, } from 'semantic-ui-react';
import MailViewList from './MailViewList.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

import parseMessages from './utils/messagesParser';

class Body extends React.Component {
  constructor(props) {
    console.log('Inside Body.jsx constructor: ', props.location);
    super(props);
    this.state = { 
      messages: [],
      visible: true
    };
  }

  componentWillMount() {
    const app = this;
    let now = Date.now();
    now = new Date(now);
    const today = now.getMonth() + '/' + now.getDate() + '/' + ('' + now.getFullYear()).substr(-2);

    axios.get('/api/messages/').then(response => {
      const retrievedMessages = parseMessages(response.data, today);
      app.setState({
        messages: retrievedMessages
      });
    });
  }

  render() {
    return (
      <div>
      <Divider hidden />
      <Divider hidden />
        <Segment.Group>
         <Segment>
           <SearchBar />
          </Segment>
            <MailViewList messages={this.state.messages}/>
        </Segment.Group>
      </div>
    );
  }
}

export default Body;