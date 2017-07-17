import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'; 
import { Message, Divider, Table, Icon } from 'semantic-ui-react';
import axios from 'axios';
import MailViewListEntry from './MailViewListEntry.jsx'

class ViewMessage extends React.Component {
  constructor(props) {
    super(props);


  }


  render() {

    var message = {
      message_id: 'abcde12345',
      account_id: 'abcde12345', // pseudo
      thread_id: 'placeholder',
      subject: 'this is a test',
      from: 'Hank', // TODO: need to pull name from email address
      to: '["janedoe@gmail.com"]',
      cc: '["kirkrohani@gmail.com"]',
      reply_to: '["test@gmail.com", "kirkrohani@gmail.com"]',
      date_received: '2017-01-09', //need be parsed from date format
      unread: true,
      starred: false,
      snippet: 'This is still a test blah blah trail off',
      body: 'This is still a test blah blah trail off end of body.',
      labels: '["labelid1", "labelid2"]'
    };

    // TODO: replace hardcoded color to dynamic color
    return (
        <div>
          <Divider hidden />
          <Divider hidden />

          <Table size='small' compact singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>{message.subject}</Table.HeaderCell>
                <Table.HeaderCell colSpan='1' textAlign='right'> <Icon name="reply" /><Icon name="trash outline" /><Icon name="ellipsis vertical" /></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <MailViewListEntry message={message} color="green" />
              
              <Table.Row>
              <Table.Cell colSpan='4'>
                {message.body}
              </Table.Cell>
              </Table.Row>
              </Table.Body>
            </Table>
          </div>
        );
      };
    };
    
    export default ViewMessage;
    
    // from={message.from} 
    // subject={message.subject}
    // snippet={message.snippet.substring(0, 45)} 
