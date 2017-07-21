import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Message, Divider, Table, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';
import ViewMessageEntry from './ViewMessageEntry.jsx';

class ViewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      threads: [],
      messageId: 'abcde12345',
      threadId: 'placeholder',
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
    .then (
      axios.get(`/api/thread/${this.state.threadId}`)
      .then (response => {
        // var thread;
        // if (Array.isArray(response.data)) {
        //   thread = response.data;
        // } else {
        //   thread = [response.data];
        // }
        this.setState({
          threads: response.data
        })
      })
    )
  }

  handleMessageClick() {
    console.log("not yet built.");
  }

  render() {
    var display = null;
    console.log('thread in view', this.state.threads);

    // TODO: have condition if there is no thread
    // TODO: change the names according to the Nylas data structure & the circle
    if (this.state.threads.length > 1) {
      display = this.state.threads.map((message, index) => {
        return <ViewMessageEntry key={index} message={message} messageId={message.message_id} onClick={this.handleMessageClick.bind(this)} />;
      })
    };

    return (
        <div>
          <Divider hidden />
          <Divider hidden />

          <Table compact singleLine>
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
            {display}
            </Table.Body>
            </Table>
            </div>
          );
        };
      };

      export default ViewMessage;

      // <Table.Row>
      // <Table.Cell width="1">
      //   <Label circular >a</Label>
      //   </Table.Cell>
      //   <Table.Cell width="3">{'     ' + this.state.currentMessage.from}</Table.Cell>
      // <Table.Cell style={{fontWeight: 'bold'}}>{this.state.currentMessage.subject}</Table.Cell>
      // <Table.Cell>{this.state.currentMessage.snippet}</Table.Cell>
      // </Table.Row>
