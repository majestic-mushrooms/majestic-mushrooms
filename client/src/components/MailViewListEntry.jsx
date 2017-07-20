import React from 'react';
import { Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MailViewListEntry = ({ message, messageId, onClick }) => {
  message.from = message.from.reduce((fromStr, sender) => fromStr + sender.name, '');
  const weight = message.unread === true ? 'bold' : 'regular';
  const cellStyle = {
    maxWidth: '20px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }

  return (
    <Table.Row onClick={onClick}>
      <Table.Cell width="4">
        <Label circular color={message.color} style={{marginRight:'8px'}}>
          {message.from.charAt(0).toUpperCase()}
        </Label>
        <span style={{fontWeight:weight}}>
          { message.from.length < 20 ? message.from : message.from.slice(0, 21) + '...' }
        </span>
      </Table.Cell>
      <Table.Cell style={cellStyle}>
        <span style={{fontWeight:weight}}>{message.subject}</span>
        <span> - </span>
        <span style={{color:'grey'}}>{message.snippet}</span>
      </Table.Cell>
    </Table.Row>
  )
};
  


export default MailViewListEntry;