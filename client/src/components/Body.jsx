import React from 'react';
import SearchBar from './SearchBar.jsx';
import RightMenu from './RightMenu.jsx';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'


class Body extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Sidebar.Pusher>

        <Segment.Group horizontal>

          <Segment basic>
            <SearchBar />
            
            <Header as='h3'>List of Mails goes here</Header>
            <Header as='h3'>List of Mails goes here</Header>
            <Header as='h3'>List of Mails goes here</Header>
            <Header as='h3'>List of Mails goes here</Header>
            <Header as='h3'>List of Mails goes here</Header>
            <Header as='h3'>List of Mails goes here</Header>
            <Header as='h3'>List of Mails goes here</Header>
            <Header as='h3'>List of Mails goes here</Header>
            
          </Segment>

          <Segment basic>
            <RightMenu />
          </Segment>

        </Segment.Group>

      </Sidebar.Pusher>
    )
  }
}

export default Body;

