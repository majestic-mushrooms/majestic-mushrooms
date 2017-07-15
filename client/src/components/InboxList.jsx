import React from 'react';
import { Segment } from 'semantic-ui-react';
import InboxListEntry from './InboxListEntry.jsx';
import { Table } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';


const InboxList = ({messages}) => (
  <Grid centered>
    <Grid.Column width={11}>
      <Table fixed singleLine>
        <Table.Body>
          {messages.map((message, key) => 
            <InboxListEntry from={message.from} subject={message.subject} snippet={message.snippet} idx={key} />
          )}
        </Table.Body>
      </Table>
    </Grid.Column>
  </Grid>
);


export default InboxList;