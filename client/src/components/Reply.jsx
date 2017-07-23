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
  }

  handleSubmit(e) {
    console.log('Inside composeMail handle Submit: ', e.target.toInputField.value);
    //@TODO REMOVE HARDCODED VALUES
    e.target.accountId = 'abcdefghijkl1234567890';
    e.target.threadId = '1';
    e.target.fromField = ['???'];
    e.target.labels = ['inbox'];
    e.target.messageId = '1';
    let message = objectBuilder.createMessage(e.target);

    console.log('After calling createMessage: ', message);
    axios.post('/api/messages', message)
      .then( message => {
        console.log('Returned back from /api/messages/', message);
        this.setState({ view: 'home', toAddress: message.data.to});
      })
      .catch( err => {
        console.log('Error after calling to /api/messages ', err);
      });
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
                  <Label color='blue' horizontal>To </Label> <Input name="toInputField" transparent={true} className="emailFields" placeholder='Who are you talking to ?' />
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