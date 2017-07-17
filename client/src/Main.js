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
import $ from 'jquery';

// for redux reducers in index.js
import reducer from './reducers/index.js';
import { createStore } from 'redux';

// for reducers
// let store = createStore(NAME_OF_reducer);

var messages = [
    {from: 'Andrea', subject: 'Stuff', snippet: 'Stuff is cool and this line goes on and on and on and forever on and on til forever til off but never really off, just on.', message_id: 0},
    {from: 'Jane', subject: 'Things', snippet: 'Things are cool.', message_id: 1}, 
    {from: 'Rick', subject: 'Morty', snippet: 'C\'mon let\'s go on an adventure, Morty!', message_id: 2}];


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'main',
      messages: messages,
      search: '' // TODO: for search bar to filter msgs ~ relates to MailViewContainer in containers folder + more redux files
    };
  }

  // componentDidMount() {
  //   $.get('/someEndpoint', (messages) => {
  //     this.setState({
  //       messages: JSON.parse(messages)
  //     });
  //   });
  // }

  render() {
    var { display } = this.state;
    if (this.state.currentView === 'main') {
      display = (
        <div className="bar">
          <Sidebar.Pushable as={Segment}>
            <LeftMenu />
            <Body messages={this.state.messages} />
          </Sidebar.Pushable>
        </div>
      );
    } else {
      display = (
        <div className="bar">
          <Sidebar.Pushable as={Segment}>
            <LeftMenu />
            <Body messages={this.state.messages}/>
          </Sidebar.Pushable>
        </div>
      );
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


