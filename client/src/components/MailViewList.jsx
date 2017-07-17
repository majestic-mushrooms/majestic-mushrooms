import React from 'react';
import { Segment } from 'semantic-ui-react';
import MailViewListEntry from './MailViewListEntry.jsx';
import { Table } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 
var currentColor = -1;

const MailViewList = ({messages}) => (
  <Grid centered>
    <Grid.Column width={11}>
      <Table selectable>
        <Table.Body>
          {messages.map((message, key) => {
            currentColor++;
            if (currentColor > messages.length) { currentColor = -1; }
            {console.log(message)}
            return <MailViewListEntry from={message.from} subject={message.subject} snippet={message.snippet} key={key} color={colors[currentColor]} />;
          })}
        </Table.Body>
      </Table>
    </Grid.Column>
  </Grid>
);


export default MailViewList;
