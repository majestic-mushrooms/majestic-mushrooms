import React from 'react';
import { Icon, Table, Segment, Label, Form, TextArea, Divider, Button, Container, Input, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createReply } from './utils/messagesHelper.js';


class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false, 
      deleted: false,
      sent: false
    };
  }

  handleSubmit(e) {
    const { message } = this.props;
    const reply = createReply(e.target, message);
    const authString = 'Bearer ' + 'aL6hAD90qniB0At9uN8Nmj0IYnX1XY';
    this.setState({sent: true});
    axios({
      method: 'post',
      url: 'https://api.nylas.com/send',
      headers: { Authorization: authString },
      data: reply,
      json: true,
      responseType: 'json'
    }).then(message => { console.log('got reply msg', message); })
    .catch(err => { console.log('Error posting reply message to Nylas', err); });
  }

  deleteDraft(e) {
    e.stopPropagation();
    this.setState({ expand: false, deleted: true });       
  }

  render() {
    const { message } = this.props;

    return (
      <Table.Cell colSpan='3' onClick={() => { this.setState({ expand: true, deleted: false }); }}>

        {!this.state.expand || this.state.sent ? (
          <Form warning>
            {this.state.deleted ? 
              (<Message
                warning style={{fontWeight: 'bold'}}
                content="Message discarded."
              />) : null
            }          
            <TextArea name="emailContentInputField" placeholder="Click here to Reply" rows="3" value=''/>
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