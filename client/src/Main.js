import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import LeftMenu from './components/LeftMenu.jsx';
import RightMenu from './components/RightMenu.jsx';
import {
  BrowserRouter as Router,
  browserHistory
} from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Navigation from './components/Navigation.js';
import Body from './components/Body.jsx';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'main'
    };

  }

  render() {
    var { display } = this.state;
    if (this.state.currentView === 'main') {
      display = (
        <div className="bar">
          <Sidebar.Pushable as={Segment}>
            <LeftMenu />
            <Body />
          </Sidebar.Pushable>
        </div>
      )
    } else {
      display = (
        <div className="bar">
          <Sidebar.Pushable as={Segment}>
            <LeftMenu />
            <Body />
          </Sidebar.Pushable>
        </div>
      )
    }

    return (
      <Router history={browserHistory} >
        {display}
      </Router>
    );
  }
}

export default Main;
ReactDOM.render(<Main />, document.getElementById('root'));


