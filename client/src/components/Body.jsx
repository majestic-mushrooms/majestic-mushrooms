import React from 'react';
import SearchBar from './SearchBar.jsx';
import RightMenu from './RightMenu.jsx';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import InboxList from './InboxList.jsx';


class Body extends React.Component {
  constructor(props) {

    super(props);
    this.state = { 
      visible: true
    };
    console.log('props in body', props);
  }

  render() {
    return (
      <Sidebar.Pusher>

        <Segment.Group horizontal>

          <Segment basic>
            <SearchBar />
            <InboxList messages={this.props.messages}/>
          </Segment>

          <Segment basic>
            <RightMenu />
          </Segment>

        </Segment.Group>

      </Sidebar.Pusher>
    );
  }
}

export default Body;



  // <Grid>
  //   <Grid.Column floated='left' width={5}>
  //     <Image src='/assets/images/wireframe/paragraph.png' />
  //   </Grid.Column>
  //   <Grid.Column floated='right' width={5}>
  //     <Image src='/assets/images/wireframe/paragraph.png' />
  //   </Grid.Column>
  // </Grid>