import React from 'react';
import { Segment } from 'semantic-ui-react';
import InboxListEntry from './InboxListEntry.jsx';
import { Table } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';


const InboxList = ({emails}) => (
  <Grid centered>
    <Grid.Column width={11}>
      <Table fixed singleLine>
        <Table.Body>
          {emails.map((email, key) => 
            <InboxListEntry name={email.name} subject={email.subject} msg={email.msg} idx={key} />
          )}
        </Table.Body>
      </Table>
    </Grid.Column>
  </Grid>
);


export default InboxList;