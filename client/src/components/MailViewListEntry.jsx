import React from 'react';
import { Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MailViewListEntry = (props) => (
  <Table.Row onClick={props.onClick}>
    <Table.Cell width="2">
      <Label circular color={props.message.color}>{props.message.from.charAt(0)}</Label>
      {'     ' + props.message.from}
    </Table.Cell>
    <Table.Cell style={{fontWeight: 'bold'}}>{props.message.subject}</Table.Cell>
    <Table.Cell>{props.message.snippet}</Table.Cell>
  </Table.Row>
);
  


export default MailViewListEntry;