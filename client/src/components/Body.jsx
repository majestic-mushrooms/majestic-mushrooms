import React from 'react';
import SearchBar from './SearchBar.jsx';
import RightMenu from './RightMenu.jsx';
import { Divider, Segment, } from 'semantic-ui-react';
import MailViewList from './MailViewList.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';



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
    const authString = 'Bearer ' + window.token;
    axios.get('https://api.nylas.com/messages', {
      headers: { Authorization: authString }
    }).then(response => {
      const retrievedMessages = response.data.slice(0, 21).map(message => {
        return {
          from: message.from,
          subject: message.subject,
          snippet: message.snippet,
          unread: message.unread,
          message_id: message.id
        };
      });
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