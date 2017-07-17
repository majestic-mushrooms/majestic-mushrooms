import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'; 
import { Form, TextArea, Divider } from 'semantic-ui-react';
import axios from 'axios';

class ComposeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'compose'
    };
  }

  buttonClickHandler() {
    this.setState({ view: 'main'});
  }


  render() {
    
    const { view } = this.state;
    return (
        <div>
        <Divider hidden />
        <Divider hidden />

        <Form>
           <TextArea autoHeight placeholder='Compose your here content here....' rows="20" />
        </Form>
        </div>
    );
  }
}

export default ComposeMessage;