import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Message, Divider, Table, Icon, Label, Image } from 'semantic-ui-react';
import axios from 'axios';
import ReadMailEntry from './ReadMailEntry.jsx';
import Reply from './Reply.jsx';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 
var currentColor = -1;


class ReadMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beforeId: this.props.location.state.beforeId,
      afterId: this.props.location.state.afterId
    };
    console.log('beforeId is', this.state.beforeId);
  }

  componentDidMount() {
    const { currentMessage, setThread } = this.props;
    var messageId = currentMessage.id;
    var threadId = currentMessage.thread_id;
    console.log('Inside ReadMail.jsx componentDidMount() m_id, t_id: ', messageId, threadId);
    axios.get(`api/threads/${threadId}`)
    .then(response => {
      // this.setState({threads: response.data});
      console.log('Inside ReadMail.jsx componentDidMount() setting thread', response.data);
      setThread(response.data);
    })
    .catch(error => {
      console.log('getThreads error: ', error);
    });
  }

  handleMessageClick() {
    console.log('handleMessageClick not yet built.');
  }

  handleCloseClick() {
    this.setState({redirect: true});    
  }

  handleNextClick() {
    console.log('handleNextClick not yet built.');
  }

  handleBeforeClick() {
    // need key, beforeMailId, afterMailId, handle one email click event as props
    console.log('handleBeforeClick not yet built. messages:', this.props.location.state);
  }
  
  createMarkup() {
    
    const { currentMessage } = this.props;
    return {__html: currentMessage.body};
  }

  render() {
    
    const { currentMessage, thread } = this.props;
    console.log('*******Inside ReadMail.jsx render() ', this.props);
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      
        <div>
          <Divider hidden />
          {thread.length === 0 ? (
            <Image src='https://s-media-cache-ak0.pinimg.com/originals/d9/93/3c/d9933c4e2c272f33b74ef18cdf11a7d5.gif' centered size='small'/>
          ) : (
            <Table fixed>
              <Table.Header>
                <Table.Row height="100px">
                  <Table.HeaderCell colSpan='2' style={{wordWrap: 'normal'}}>
                  <h2>{currentMessage.subject}</h2>
                  </Table.HeaderCell>


                  <Table.HeaderCell colSpan='1' textAlign='right'> 
                    {this.state.beforeId !== 'end' ? <Icon name="chevron left" onClick={this.handleBeforeClick.bind(this)}/> : null}
                    {this.state.afterId !== 'end' ? <Icon name="chevron right" onClick={this.handleNextClick.bind(this)}/> : null}
                      <Icon name="remove" onClick={this.handleCloseClick.bind(this)}/>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {<ReadMailEntry message={thread[0]} messageId={thread[0].message_id} />}
                <Table.Row>
                  <Table.Cell colSpan='3'>
                    <div dangerouslySetInnerHTML={this.createMarkup()} ></div>
                  </Table.Cell>
                </Table.Row>
                  {thread.slice(1, thread.length).map((message, index) => {
                    currentColor++;
                    if (currentColor > thread.length) { currentColor = -1; }
                    return <ReadMailEntry key={index} message={message} messageId={message.message_id} 
                  onClick={this.handleMessageClick.bind(this)} />;
                  })}
              <Table.Row>
                <Reply />
              </Table.Row>
            </Table.Body> 
          </Table>
        )}
      </div>
    );
  }
}

export default ReadMail;