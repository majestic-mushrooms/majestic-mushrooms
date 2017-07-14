import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'; 
import { Button } from 'semantic-ui-react';

class ReadEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'read'
    };
  }

  buttonClickHandler() {
    this.setState({ view: 'main'});
  }

  render() {
    
    const { view } = this.state;
    console.log('rendering ReadEmail.js with view: ', view);
    return (
        <div>
          { (view === 'main') &&  <Redirect from={'/ReadEmail'} push to={{
            pathname: '/'
          }}/>
          }
          <Button primary onClick={this.buttonClickHandler.bind(this)} >Go Back Home</Button>
        </div>
    );
  }
}

export default ReadEmail;