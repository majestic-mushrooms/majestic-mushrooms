import React from 'react';
import { Icon, Table, Segment, Label, Form, TextArea, Divider, Button, Container, Input, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false, 
      deleted: false
    };
    console.log('TOKEN', window.token);
  }

  handleSubmit(e) {
    const { message } = this.props;
    console.log('===MSG', message);
    // console.log('Inside Reply handle Submit: ', e.target.toInputField.value);
    // console.log('body: ', e.target.emailContentInputField.value);

    var subject = 'RE: ' + message.subject;
    var replyToMessageId = message.id;
    // var fromArr = [{ name: 'person', email: 'andreamiralles686@gmail.com' }];
    var fromArr = message.to;
    var to = message.from;
    var body = e.target.emailContentInputField.value + message.body;
    // console.log('subject', subject);
    // console.log('replyMsgId', replyToMessageId);
    // console.log('fromArr', fromArr);
    // console.log('to', to);

    const authString = 'Bearer ' + window.token;
    axios.post('https://api.nylas.com/send', {
      headers: { Authorization: authString },
      body: {
        from: fromArr,
        to: to,
        body: body,
        // reply_to_message_id: replyToMessageId,
        subject: subject
      },
      json: true
    }).then(response => { console.log(response); })
    .catch(err => { console.log('Error sending message ', err); });

    console.log('after calling nylas');



  //   console.log('After calling createMessage: ', message);
  //   axios.post('/api/messages', message)
  //     .then( message => {
  //       console.log('Returned back from /api/messages/', message);
  //       this.setState({ view: 'home', toAddress: message.data.to});
  //     })
  //     .catch( err => {
  //       console.log('Error after calling to /api/messages ', err);
  //     });
  }

  deleteDraft(e) {
    e.stopPropagation();
    this.setState({ expand: false, deleted: true });
    // {this.state.deleted ? 
    //   (<Message
    //     warning style={{fontWeight: 'bold'}}
    //     content="Message discarded."
    //   />) : null
    // }
            
  }

  render() {
    const { message } = this.props;
    // console.log('reply msg', message.from[0].email);
    // console.log('reply this.props', this.props);

    return (
      <Table.Cell colSpan='3' onClick={() => { this.setState({ expand: true, deleted: false }); }}>

        {!this.state.expand ? (
          <Form warning>
            {this.state.deleted ? 
              (<Message
                warning style={{fontWeight: 'bold'}}
                content="Message discarded."
              />) : null
            }          
            <TextArea name="emailContentInputField" placeholder="Click here to Reply" rows="3" />
          </Form>
        ) : (

              <Form onSubmit={this.handleSubmit.bind(this)}>

                <Container>
                  <Label color='blue' horizontal>To </Label> 
                  <Input name="toInputField" transparent={true} className="emailFields" defaultValue={message.from[0].email} />
                  <Divider />
                </Container> 
                <TextArea name="emailContentInputField" autoHeight placeholder="Click here to Reply" rows="7" />
                <Divider hidden />
      
                <Container textAlign="right">
                  <Icon size="large" name="trash outline" onClick={(e) => { this.deleteDraft(e); }}/>
                  <Button primary>Send</Button>
                </Container>
              </Form>

        )}
      </Table.Cell>
    );
  }

}
    
export default Reply;