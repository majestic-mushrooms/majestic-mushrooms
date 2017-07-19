import React from 'react';
import { Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MailViewListEntry = (props) => (
  <Table.Row onClick={props.onClick}>
    <Table.Cell width="1">
      <Label circular color={props.message.color}>{props.message.from[0].charAt(1)}</Label>
      </Table.Cell>
      <Table.Cell width="3">{'     ' + props.message.from}</Table.Cell>
    <Table.Cell style={{fontWeight: 'bold'}}>{props.message.subject}</Table.Cell>
    <Table.Cell>{props.message.snippet}</Table.Cell>
  </Table.Row>
);
  


export default MailViewListEntry;