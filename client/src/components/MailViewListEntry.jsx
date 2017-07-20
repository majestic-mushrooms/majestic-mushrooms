import React from 'react';
import { Icon, Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = window.token;

class MailViewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false
    };
  }

  replyMessage(e, messageId) {
    console.log('replying to message:', messageId);
  }

  deleteMessage(e, messageId) {
    console.log('deleting message:', messageId);
    console.log('token', window.token);
    e.stopPropagation();
    
    // const authString = 'Bearer ' + window.token;
    // axios.put('https://api.nylas.com/messages/' + messageId).then(response => {
    //   console.log(messageId, 'deleted!');
    // })
  }

  render() {
    const { message, messageId, show, onClick } = this.props;
    const fromStr = message.from.reduce((fromStr, sender) => fromStr + sender.name, '');
    const weight = message.unread === true ? 'bold' : 'regular';
    const cellStyle = {
      maxWidth: '40vw',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }

    return (
      <Table.Row onClick={onClick} onMouseEnter={() => {this.setState({ showButton: true });}}
        onMouseLeave={() => {this.setState({ showButton: false });}}>
        <Table.Cell width="4">
          <Label circular color={message.color} style={{marginRight:'8px'}}>
            { fromStr.charAt(0).toUpperCase() }
          </Label>
          <span style={{fontWeight:weight}}>
            { fromStr.length < 20 ? fromStr : fromStr.slice(0, 21) + '...' }
          </span>
        </Table.Cell>
        <Table.Cell style={cellStyle}>
          <span style={{fontWeight:weight}}>{message.subject}</span>
        </Table.Cell>
        <Table.Cell width="3" textAlign="right">
          {this.state.showButton === true ? 
          ( 
            <div>
              <Icon name="reply" onClick={(e) => { this.replyMessage(e, messageId); }}/>
              <Icon name="trash outline" onClick={(e) => { this.deleteMessage(e, messageId); }}/>
              <Icon name="ellipsis vertical" />
            </div>
          ) : (
            ''
          )}
        </Table.Cell>
      </Table.Row>
    )
  }
};


export default MailViewListEntry;