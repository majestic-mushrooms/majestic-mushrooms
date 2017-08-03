import React from 'react';
import { Icon, Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { queryMessageDetails } from './utils/messagesHelper.js';

class EmailListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false
    };
  }


  handleMessageClick(messageId, messageIndex, messageUnread) {
    queryMessageDetails(messageId, messageIndex, messageUnread, this.props.setCurrentMessage);
  }

  deleteMessage(e, messageId) {
    e.stopPropagation();

    //@TODO: replace number string with real trash folder id, from state + add type
    axios.put(`/api/messages/${messageId}/trash/'3948384545'`).then(response => { 
      console.log('message deleted!', response);
    });
  }

  render() {
    console.log('emailListItem vview ======', this.props.view);

    const {view, messageIndex } = this.props;
    const messages = (view === 'Search') ? this.props.searchResults : this.props.messages;

    const message = messages[messageIndex];
    const fromStr = message.from.reduce((fromStr, sender) => fromStr + sender.name, '');
    const weight = message.unread === true ? 'bold' : 'normal';

    return (
    
        <Table.Row 
          onClick={ () => { this.handleMessageClick(message.message_id, messageIndex, message.unread); }}
          onMouseEnter={() => { this.setState({ showButton: true }); }}
          onMouseLeave={() => { this.setState({ showButton: false }); }}>

          <Table.Cell width="4">
            <Label circular style={{marginRight:'8px', background: message.color, color:'white'}}>
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
                <Icon name="reply" onClick={ (e) => { onClick(e, message.message_id); }}/>
                <Icon name="trash outline" onClick={ (e) => { this.deleteMessage(e, message.message_id); }}/>
              </div>
            ) : (
              <span>{message.timestamp}</span>
            )}
          </Table.Cell>
        </Table.Row>
      
    );
  }
}


export default EmailListItem;

