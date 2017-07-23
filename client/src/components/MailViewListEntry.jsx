import React from 'react';
import { Icon, Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MailViewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false
    };
  }

  deleteMessage(e, messageId) {
    console.log('deleting message:', messageId);
    e.stopPropagation();

    //@TODO: replace number string with real trash folder id, from state + add type
    axios.put(`/api/messages/${messageId}/trash/'3948384545'`).then(response => { 
      console.log('message deleted!', response);
    });
  }

  render() {
    const { message, messageId, show, onClick, beforeId, afterId } = this.props;
    const fromStr = message.from.reduce((fromStr, sender) => fromStr + sender.name, '');
    const weight = message.unread === true ? 'bold' : 'regular';
    return (
      <Table.Row onClick={ (e) => { onClick(e, messageId, message.unread, beforeId, afterId); }} onMouseEnter={() => {this.setState({ showButton: true });}}
        onMouseLeave={() => {this.setState({ showButton: false });}}>
        <Table.Cell width="4">
          <Label circular color={message.color} style={{marginRight:'8px'}}>
            { fromStr.charAt(0).toUpperCase() }
          </Label>
          <span style={{fontWeight: weight}}>
            { fromStr.length < 20 ? fromStr : fromStr.slice(0, 21) + '...' }
          </span>
        </Table.Cell>
        <Table.Cell>
          <span style={{fontWeight: weight}}>{message.subject}</span>
        </Table.Cell>
        <Table.Cell width="3" textAlign="right">
          {this.state.showButton === true ? 
          ( 
            <div>
              <Icon name="reply" onClick={ (e) => { onClick(e, messageId); }}/>
              <Icon name="trash outline" onClick={ (e) => { this.deleteMessage(e, messageId); }}/>
            </div>
          ) : (
            <span>{message.timestamp}</span>
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}


export default MailViewListEntry;