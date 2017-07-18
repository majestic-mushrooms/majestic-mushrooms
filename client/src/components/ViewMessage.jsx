import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'; 
import { Message, Divider, Table, Icon } from 'semantic-ui-react';
import axios from 'axios';
import MailViewListEntry from './MailViewListEntry.jsx'

class ViewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      threads: [],
      messageId: 'abcde12345',
      currentMessage: {}
    }
  }

  componentWillMount() {
    var messageId = this.state.messageId;
    axios.get('/api/message/'+ this.state.messageId)
    .then (response => {
      this.setState({
        currentMessage: response.data
      })
    })
    // .then (
    //   axios.get('/api/message')
    //   .then (response => {
    //     console.log(response)
    //     // this.setState({
    //     //   threads: response.data
    //     // })
    //   })
    // )
  }

  render() {
    // TODO: replace hardcoded color to dynamic color
    return (
        <div>
          <Divider hidden />
          <Divider hidden />

          <Table size='small' compact singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>{this.state.currentMessage.subject}</Table.HeaderCell>
                <Table.HeaderCell colSpan='1' textAlign='right'> <Icon name="reply" /><Icon name="trash outline" /><Icon name="ellipsis vertical" /></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            <Table.Row>
            <Table.Cell colSpan='4'>
            {this.state.currentMessage.body}
            </Table.Cell>
            </Table.Row>
            </Table.Body>
            </Table>
            </div>
          );
        };
      };
      
      export default ViewMessage;
      // {this.props.messages.map((message, index) => {
      //   currentColor++;
      //   if (currentColor > messages.length) { currentColor = -1; }
      //   return <MailViewListEntry key={index} message={message} onClick={this.handleMessageClick.bind(this)} />;
      // })}