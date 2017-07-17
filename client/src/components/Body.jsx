import React from 'react';
import SearchBar from './SearchBar.jsx';
import RightMenu from './RightMenu.jsx';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import MailViewList from './MailViewList.jsx';
import ReadMail from './ReadMail.jsx';

class Body extends React.Component {
  constructor(props) {

    super(props);
    this.state = { 
      visible: true
    };
  }

  render() {
    return (
      <Sidebar.Pusher>
        <Segment.Group horizontal>

          <Segment basic>
            <SearchBar />
            <ReadMail messages={this.props.messages} current={this.props.current} />
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