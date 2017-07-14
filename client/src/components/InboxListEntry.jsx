import React from 'react';
import { Table } from 'semantic-ui-react';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
];

const InboxListEntry = (props) => {
  
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>{props.subject}</Table.Cell>
      <Table.Cell>{props.msg}</Table.Cell>
    </Table.Row>
  );
};

export default InboxListEntry;