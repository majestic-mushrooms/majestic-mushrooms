import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'; 
import { Form, TextArea, Divider, Button, Segment, Container, Input, Label, Message } from 'semantic-ui-react';
import axios from 'axios';
import { createMessage } from './utils/messagesHelper.js';



class ComposeEmail extends React.Component {
  constructor(props) {
    super(props);
  }


  handleSubmit(e) {
    const { setView } = this.props;
    let message = createMessage(e.target, this.props.account.email_address);
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

    console.log('AFTER WITH MESSAGE: ', message);

  }

  render() {
    const { view } = this.props;
    return (
        <div>
        { 
        view === 'Inbox' && 
        <Redirect from={'/compose'} 
                  push
                  to={'/'} /> 
        }
        <Divider hidden />
        { view === 'DisplayMessage' && 
        <Message negative>
          <Message.Header>We are unable to send your message.</Message.Header>
          <p>It seems one of your email address is in the incorrect format.
            Please re-submit your message.
          </p>
        </Message>
        }

          <Segment.Group>
          <Segment padded={true}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
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
      

        </div>
    );
  }
}

export default ComposeEmail;

