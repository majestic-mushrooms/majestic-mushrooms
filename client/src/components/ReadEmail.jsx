import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import { Message, Divider, Table, Icon, Label, Image, Menu } from 'semantic-ui-react';
import axios from 'axios';
import ReadMailEntry from './ReadMailEntry.jsx';
import EmailListItemContainer from '../containers/EmailListItemContainer.jsx';
import Reply from './Reply.jsx';
import { queryMessageDetails } from './utils/messagesHelper.js';
import { WAIT_IMAGE } from './utils/stylesHelper.js';
import { parseMessage } from './utils/messagesHelper';
import { today } from './utils/dateTimeHelper';


class ReadEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: '0px'
    }
  }

  componentDidMount() {
    const { currentMessage, setThread } = this.props;
    var messageId = currentMessage.message_id;
    var threadId = currentMessage.thread_id;
    axios.get(`api/threads/${threadId}`)
    .then(response => {
      setThread(parseMessage(response.data, today));
      let iframedoc = this.messageBody.contentDocument || this.messageBody.contentWindow.document;
      iframedoc.body.innerHTML = currentMessage.body;
      this.setState({ contentHeight: iframedoc.body.scrollHeight + 50 + 'px' })
    })
    .catch(error => {
      console.log('getThreads error: ', error);
    });
  }
  
  handleArrowClick(arrowDirection) {
    
    const newMessageIndex = this.props.currentMessage.messageIndex + arrowDirection;
    const { messages, setCurrentMessage } = this.props;
    queryMessageDetails(messages[newMessageIndex].message_id, newMessageIndex, messages[newMessageIndex].unread, setCurrentMessage );

  }

  createMarkup() {
    // const { currentMessage } = this.props;
    // return {__html: currentMessage.body};
  }
  
  handleCloseClick() {

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
            <Image src={WAIT_IMAGE} centered size='small'/>            
            ) : (
            <Table fixed>
              <Table.Header>
                <Table.Row height="100px">
                  <Table.HeaderCell colSpan='2' style={{wordWrap: 'normal'}}>
                    <h2>{currentMessage.subject}</h2>
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan='1' textAlign='right'> 
                    {currentMessage.messageIndex > 0 ? <Icon name="chevron left" onClick={this.handleArrowClick.bind(this, -1)}/> : null}
                    {currentMessage.messageIndex < messages.length ? <Icon name="chevron right" onClick={this.handleArrowClick.bind(this, 1)}/> : null}
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
