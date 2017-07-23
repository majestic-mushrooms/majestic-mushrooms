
import React from 'react';
import { Segment } from 'semantic-ui-react';
import MailViewListEntry from './MailViewListEntry.jsx';
import { Table, Grid, Dimmer, Loader, Image} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';


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
          <Image src='https://s-media-cache-ak0.pinimg.com/originals/d9/93/3c/d9933c4e2c272f33b74ef18cdf11a7d5.gif' centered size='small'/>
          ) : (
          <Table singleLine fixed>
            <Table.Body>
              {messages.map((message, index, array) => {
                var beforeId = array[index-1]? array[index-1].message_id : 'end';
                var afterId = array[index+1] ? array[index+1].message_id : 'end';
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