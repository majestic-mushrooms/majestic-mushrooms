import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import { Message, Divider, Table, Icon, Label, Image, Menu } from 'semantic-ui-react';
import axios from 'axios';
import ReadMailEntry from './ReadMailEntry.jsx';
import EmailListItemContainer from '../containers/EmailListItemContainer.jsx';
import Reply from './Reply.jsx';
import { queryMessageDetails } from './utils/messagesHelper.js';
import { parseMessage } from './utils/messagesHelper';
import { today } from './utils/dateTimeHelper';


class ReadEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: '0px'
    };
  }

  addContent() {
    const iframedoc = this.messageBody.contentDocument || this.messageBody.contentWindow.document;
    iframedoc.body.innerHTML = this.props.currentMessage.body;
    this.setState({ contentHeight: iframedoc.body.scrollHeight + 'px' });
  }

  componentDidMount() {
    const app = this;
    const { currentMessage, setThread } = this.props;
    var messageId = currentMessage.message_id;
    var threadId = currentMessage.thread_id;
    threadId ?
      axios.get(`api/threads/${threadId}`)
      .then(response => {
        setThread(parseMessage(response.data, today));
        app.addContent();
      })
      .catch(error => {
        console.log('getThreads error: ', error);
      })
    : null;
  }
  
  handleArrowClick(arrowDirection) {
    const app = this;
    const newMessageIndex = this.props.currentMessage.messageIndex + arrowDirection;
    const { messages, setCurrentMessage, setThread } = this.props;

    const messageId = messages[newMessageIndex].message_id;
    const threadId = messages[newMessageIndex].thread_id;
    const messageIndex = newMessageIndex;
    const messageUnread = messages[newMessageIndex].unread;
    const readMessage = [
      () => { return axios.get(`/api/messages/read/${messageId}`); },
      () => { if (messageUnread === true) { return axios.put(`/api/messages/${messageId}/read/null`); } },
      () => { return axios.get(`api/threads/${threadId}`); }
    ];

    axios.all(readMessage.map(axiosCall => axiosCall()))
    .then(axios.spread((res1, res2, res3) => {
      setCurrentMessage(res1.data, messageIndex);
      setThread(parseMessage(res3.data, today));
      app.addContent();
    }))
    .catch(err => {
      console.log('ERROR getting messages: ', err);
    });
  }

  render() {
    
    const { currentMessage, thread, messages, view } = this.props;
    
    return (
      
      <div>
        { view === 'Inbox' && (
          <Redirect from={'/message'} push to={'/'}/>
        )}

          <Divider hidden />
          {thread.length === 0 ? (
            <div className="loader">
              <div className="inner one"></div>
              <div className="inner two"></div>
              <div className="inner three"></div>
            </div>           
            ) : (
            <Table fixed>
              <Table.Header>
                <Table.Row height="100px">
                  <Table.HeaderCell colSpan='2' style={{wordWrap: 'normal'}}>
                    <h2>{currentMessage.subject}</h2>
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan='1' textAlign='right'>
                    {currentMessage.messageIndex > 0 ? <Icon name="chevron left" onClick={this.handleArrowClick.bind(this, -1)}/> : null}
                    {currentMessage.message_id !== messages[messages.length-1].message_id ? <Icon name="chevron right" onClick={this.handleArrowClick.bind(this, 1)}/> : null}
                    <Menu.Item as={Link} to='/' onClick={ () => { setNewView('Inbox'); }}> <Icon name='remove' /> </Menu.Item>
                    
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
                    
              <Table.Body>
                {<ReadMailEntry message={thread[0]} messageId={thread[0].message_id} />}
                <Table.Row>
                  <Table.Cell colSpan='3' verticalAlign='top' style={{position:'relative', height:this.state.contentHeight}}>
                    <iframe 
                      style={{position:'absolute', width:'97.5%', height:'100%'}} 
                      ref={input => this.messageBody = input}
                      frameBorder='0'
                    ></iframe>
                  </Table.Cell>
                </Table.Row>
                {thread.slice(1, thread.length).map((message, index) => {
                  return <ReadMailEntry key={index} message={message} messageId={message.message_id} />;
                })}

                <Table.Row>
                  <Reply message={currentMessage}/>
                </Table.Row>
              </Table.Body> 
            </Table>
          )}
      </div>
    );
  }
}
            
export default ReadEmail;
