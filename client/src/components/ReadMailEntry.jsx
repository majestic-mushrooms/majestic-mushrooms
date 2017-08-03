import React from 'react';
import { Icon, Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class ReadMailEntry extends React.Component {
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
    const { message, messageId, show, onClick } = this.props;
    const fromStr = message.from.reduce((fromStr, sender) => fromStr + sender.name, '');
    const weight = message.unread === true ? 'bold' : 'regular';

    return (
      <Table.Row>
        <Table.Cell width="4">
          <Label circular style={{marginRight:'8px', background:message.color, color:'white'}}>
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
        </Table.Cell>
      </Table.Row>
    );
  }
}


export default ReadMailEntry;