import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Message, Divider, Table, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';
import ReadMail from './ReadMail.jsx';

class ViewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      threads: [],
      messageId: this.props.location.state.from.message_id,
      threadId: this.props.location.state.from.thread_id,
      currentMessage: this.props.location.state.from
    }
  }

  componentWillMount(threadId) {
    var messageId = this.state.messageId;
    // var threadId = this.state.threadId
    var threadId = '12sav690mijdpe6qok1c9ujhy';
    console.log('=====this is the props, threadId, messageId====',this.props, threadId, messageId)

    axios.get(`/api/threads/${threadId}`)
    .then(response => {
      console.log('getThreads success', response);
    })
    .catch(error => {
        console.log('getThreads error: ', error);
    });
  }

  handleMessageClick() {
    console.log("not yet built.");
  }

  render() {
    var display = null;
    {console.log('thread in view', this.state.threads);}

    // TODO: have condition if there is no thread
    // TODO: change the names according to the Nylas data structure & the circle
    if (this.state.threads.length > 1) {
      display = this.state.threads.map((message, index) => {
        return <ReadMailEntry key={index} message={message} onClick={this.handleMessageClick.bind(this)} />;
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
