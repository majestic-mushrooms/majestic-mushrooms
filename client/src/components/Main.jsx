import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import LeftMenu from './LeftMenu.jsx';
import RightMenu from './RightMenu.jsx';
import Body from './Body.jsx';
import { Link } from 'react-router-dom';


var messages = [
    {from: 'Andrea', subject: 'Stuff', snippet: 'Stuff is cool and this line goes on and on and on and forever on and on til forever til off but never really off, just on.', message_id: 0},
    {from: 'Jane', subject: 'Things', snippet: 'Things are cool.', message_id: 1}, 
    {from: 'Rick', subject: 'Morty', snippet: 'C\'mon let\'s go on an adventure, Morty!', message_id: 2}];


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'main',
      messages: messages
    };
  }


  render() {
    return (
        <div className="bar">
          <Link to='/test'>Hello World </Link>
          <Link to='/hello'>What what? </Link>
          <Sidebar.Pushable as={Segment}>
            <LeftMenu />
            <Body messages={this.state.messages}/>
          </Sidebar.Pushable>
        </div>
    );
  }
}

export default Main;



// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
// import LeftMenu from './components/LeftMenu.jsx';
// import RightMenu from './components/RightMenu.jsx';
// import Body from './components/Body.jsx';