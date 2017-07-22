
import React from 'react';
import { Segment } from 'semantic-ui-react';
import MailViewListEntry from './MailViewListEntry.jsx';
import { Table, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 
var currentColor = -1;


class MailViewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'messages',
      messages: [],
      current: {},
      beforeId: '',
      afterId: ''
    };
  }
  
  componentWillReceiveProps({ messages }) {
    this.setState({messages: messages});
  }

  handleMessageClick(e, messageId, beforeId, afterId) {

    const readMessage = [
      () => { return axios.get(`/api/messages/read/${messageId}`); },
      () => { return axios.put(`/api/messages/${messageId}/read/null`); }
    ];
    axios.all(readMessage.map(axiosCall => axiosCall()))
    .then(axios.spread((res1, res2) => {
      this.setState({
        view: 'read',
        current: res1.data,
        beforeId: beforeId,
        afterId: afterId
      });
    }))
    .catch(err => console.log(err));
  }

  render() {
    const { messages, view } = this.state;
  
    return (
      <div>
        { view === 'read' && (
        <Redirect from={'/'} push to={{
          pathname: '/message',
          state: {from: this.state.current, beforeId: this.state.beforeId, afterId: this.state.afterId}
        }}/>
        )}
        {messages.length === 0 ? (
          <Loader active inline='centered' />
          ) : (
          <Table singleLine fixed>
            <Table.Body>
              {messages.map((message, index, array) => {
                currentColor++;
                var beforeId = array[index-1]? array[index-1].message_id : 'end';
                var afterId = array[index+1] ? array[index+1].message_id : 'end';
                if (currentColor > messages.length) { currentColor = -1; }
                return <MailViewListEntry key={index} message={message} messageId={message.message_id}
                  beforeId={beforeId} afterId={afterId}
                  onClick={this.handleMessageClick.bind(this)} />;
              })}
            </Table.Body> 
          </Table>
          )
        }
      </div>
    );

  }
}

export default MailViewList;