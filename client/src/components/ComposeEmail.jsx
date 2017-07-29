import React from 'react';
import { Redirect } from 'react-router-dom'; 
import { Form, TextArea, Divider, Button, Segment, Container, Input, Label, Message, Image } from 'semantic-ui-react';
import axios from 'axios';
import { createMessage } from './utils/messagesHelper.js';
import { WAIT_IMAGE } from './utils/stylesHelper.js';
import UserMessage from './UserMessage.jsx';


const handleSubmit = (props, e) => {
  const { setView } = props;

  setView('Waiting');
  let message = createMessage(e.target, props.account.email_address);
  if (message === undefined) {
    setView('DisplayMessage');
  } else {
    axios.post('/api/messages', message)
    .then( newMessage => {
      setView('Inbox');
    })
    .catch( err => {
      console.log('Error after calling to /api/messages ', err);
    });
  }
};


const ComposeEmail = (props) => {

  const { view } = props;
  return (
      <div>
      { 
      view === 'Waiting' && 
          <Image src={WAIT_IMAGE} centered size='small'/>
      }

      { 
      view === 'Inbox' && 
      <Redirect from={'/compose'} push to={
      {
        pathname: '/',
        messageSent: true
      }}/>
      }

     
      <Divider hidden />
   
      <UserMessage view={view} message={ 
      {
        title: 'We are unable to send your message',
        body: 'It seems that one of your email addresses is not in the correct format.',
        color: 'red'
      }
      }/>
      
      { 
      (view === 'Compose' || view === 'DisplayMessage') && 
        <Segment.Group>
        <Segment padded={true}>
        <Form onSubmit={handleSubmit.bind(this, props)}>
          <Container>
            <Label color='blue' horizontal>To </Label> <Input name="toInputField" transparent={true} className="emailFields" placeholder='Who are you talking to ?' />
            <Divider />
            <Label color='olive' horizontal>Cc </Label><Input name="ccInputField"transparent={true} className="emailFields" placeholder='Copy others on this message...' />
            <Divider hidden/>
          </Container> 
          <TextArea name="emailContentInputField" autoHeight placeholder="Say what's on your mind..." rows="20" />
          <Divider hidden />
          <Container>
              <Label color='grey' horizontal>Subject </Label><Input name="subjectInputField" className="emailFields" transparent={true} placeholder='What are you talking about?' />
          </Container>
          <Container textAlign="right">
            <Button primary>Send</Button>
          </Container>
        </Form>
        </Segment>
        </Segment.Group>
      }
      </div>
  );
  
};

export default ComposeEmail;




                     
