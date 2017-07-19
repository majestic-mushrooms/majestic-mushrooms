import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'; 
import { Form, TextArea, Divider, Button, Segment, Container, Input, Label } from 'semantic-ui-react';
import axios from 'axios';
import objectBuilder from '../../../utils/objectBuilder.js';



class ComposeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'compose',
      toAddress: null
    };
  }



  handleSubmit(e) {
    console.log('Inside handle Submit: ', e.target.toInputField.value);
    //@TODO REMOVE HARDCODED VALUES
    e.target.accountId = 'abcdefghijkl1234567890';
    e.target.threadId = '1';
    e.target.fromField = ['kirk.rohan@gmail.com'];
    e.target.labels = ["inbox"];
    e.target.messageId = "1";
    let message = objectBuilder.createMessage(e.target);

    console.log('After calling createMessage: ', message);
    axios.post('/api/message', message)
      .then( message => {
        console.log('Returned back from /api/messages/', message);
        this.setState({ view: 'home', toAddress: message.data.to});
      })
      .catch( err => {
        console.log('Error after calling to /api/messages ', err);
      });
  }
//   <Redirect to={{
// pathname: '/login',
// search: '?utm=your+face',
// state: { referrer: currentLocation }
// }}/>

  render() {
    
    const { view, toAddress } = this.state;
    return (
        <div>
        { 
        view === 'home' && 
        <Redirect from={'/compose'} 
                  push
                  to={{
                    pathname: '/',
                    state: { toAddress: toAddress }
                  }} /> 
        }
        <Divider hidden />
        <Divider hidden />
          <Segment.Group>
          <Segment padded={true}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Container>
              <Label color='blue' horizontal>To </Label> <Input name="toInputField" transparent={true} className="emailFields" placeholder='Who are you talking to ?' />
              <Divider  />
              <Label color='olive' horizontal>Cc </Label><Input name="ccInputField"transparent={true} className="emailFields" placeholder='Copy others on this message...' />
              <Divider  hidden/>
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

export default ComposeMessage;




{/* <Segment>
<Label color='blue' horizontal>To </Label><Input transparent={true} placeholder='Who do you want to talk to?' />
<Divider  />
 <Label color='olive' horizontal>Cc </Label><Input transparent={true} placeholder='Copy others on this message...' />
 <Divider  />
 <Label color='grey' horizontal>Subject </Label><Input transparent={true} placeholder='So, what do you want to talk about?' />
</Segment> */}