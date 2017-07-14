import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  browserHistory
} from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Navigation from './components/Navigation.js';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'main'
    };

  }

  render() {
    const { view } = this.state;
    console.log('rendering main.js with view: ', view);
    return (
      <Router history={browserHistory} >
        <div>
          <div><h1>Hello from app.js</h1></div>
          <Link to="/ReadEmail">Read Email</Link>
          <Navigation />
        </div>
        </Router>
    );
  }
}

export default Main;
ReactDOM.render(<Main />, document.getElementById('root'));