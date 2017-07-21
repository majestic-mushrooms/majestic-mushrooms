import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Message, Divider, Table, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';
import ReadMailEntry from './ReadMailEntry.jsx';
import Reply from './Reply.jsx'

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 
var currentColor = -1;


class ViewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      threads: [],
      messageId: this.props.location.state.from.id,
      threadId: this.props.location.state.from.thread_id,
      currentMessage: this.props.location.state.from
    }
  }

  componentDidMount() {
    var messageId = this.props.location.state.from.id;
    var threadId = this.props.location.state.from.thread_id;

    axios.get(`api/threads/${threadId}`)
    .then(response => {
      this.setState({threads: response.data})
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
    {console.log('rendering ReadMail.jsx', this.state.threads);}

    return (
            
        <div>
          {this.state.threads.length === 0 ? (
            <span>Loading your messages, please wait.</span>
          ) : (
            <Table singleLine fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='3'>Title: {this.state.currentMessage.subject}</Table.HeaderCell>
                  <Table.HeaderCell colSpan='1' textAlign='right'> <Icon name="reply" /><Icon name="trash outline" /><Icon name="ellipsis vertical" /></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            <Table.Body>
            {this.state.threads.map((message, index) => {
              currentColor++;
              if (currentColor > this.state.threads.length) { currentColor = -1; }
              return <ReadMailEntry key={index} message={message} messageId={message.message_id} 
              onClick={this.handleMessageClick.bind(this)} />;
            })}
           <Table.Row><Reply /></Table.Row>
            </Table.Body> 
            </Table>
          )
        }
      </div>
    );
  };
};

export default ViewMessage;