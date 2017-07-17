import React from 'react';
import { Segment } from 'semantic-ui-react';
import MailViewListEntry from './MailViewListEntry.jsx';
import { Table, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 
var currentColor = -1;

const handleMessageClick = () => {
  
};

const MailViewList = ({messages}) => (

      <Table>
        <Table.Body>
          {messages.map((message, key) => {
            currentColor++;
            if (currentColor > messages.length) { currentColor = -1; }
            return <MailViewListEntry from={message.from} subject={message.subject} snippet={message.snippet} key={key} color={colors[currentColor]} />;
          })}
        </Table.Body>
      </Table>
);


export default MailViewList;
