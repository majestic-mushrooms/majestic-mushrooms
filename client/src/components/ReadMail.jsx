import React from 'react';
import ReactDOM from 'react-dom';
import { Segment } from 'semantic-ui-react';
import MailViewListEntry from './MailViewListEntry.jsx';
import { Table } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'; 
import { Grid, Button, Divider, Icon } from 'semantic-ui-react';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 
var currentColor = -1;

class ReadMail extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMessageLength() {
    var messages = this.props.messages.slice(0, 1);

    return messages.map((message, key) => {
      currentColor++;
      if (currentColor > messages.length) { currentColor = -1; }
      if (message.snippet.length > 45) {
        var snippet = message.snippet.slice(0, 45) + ' ...'
      } else {
        var snippet=message.snippet;
      }
      return <MailViewListEntry from={message.from} 
        subject={message.subject}
        snippet={snippet}  
        key={key}
        color={colors[currentColor]} />;
    })
  }

  handleIconClick(name) {
    console.log('icon clicked', name);
  }


  render() {
    
    var messages = this.props.messages;

    return (
      <Grid> 
        <Grid.Column>
          <Table size='small' compact singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>{messages[0].subject}</Table.HeaderCell>
                <Table.HeaderCell colSpan='1' textAlign='right'> 
                  <Icon name="reply" link name="reply" onClick={() => this.handleIconClick() }/>
                  <Icon name="trash outline" onClick={this.handleIconClick.bind(this)}/>
                  <Icon name="ellipsis vertical" onClick={this.handleIconClick.bind(this)}/>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row textAlign='center'> 
                <Table.Cell colSpan='4' disabled> 
                  <Divider fitted /><Divider fitted />{ messages.length - 1 } more messages <Divider fitted /><Divider fitted/>
                </Table.Cell>
              </Table.Row>
                {this.handleMessageLength()}
              <Table.Row>
                <Table.Cell colSpan='4'>
                 {this.props.current.body}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}


export default ReadMail;
