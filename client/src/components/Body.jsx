import React from 'react';
import SearchBar from './SearchBar.jsx';
import RightMenu from './RightMenu.jsx';
import { Divider, Segment, } from 'semantic-ui-react';
import MailViewList from './MailViewList.jsx';


class Body extends React.Component {
  constructor(props) {

    super(props);
    this.state = { 
      visible: true
    };
  }
  


  render() {
    const messages = [
      {from: 'Andrea', subject: 'Lets talk about this', snippet: 'Stuff is cool and this line goes on and on and on and forever on and on til forever til off but never really off, just on.', message_id: 0},
      {from: 'Jane', subject: 'Things', snippet: 'Things are cool.', message_id: 1}, 
      {from: 'Rick', subject: 'Morty', snippet: 'C\'mon let\'s go on an adventure, Morty!', message_id: 2}
    ];

    return (
      <div>
      <Divider hidden />
      <Divider hidden />
        <Segment.Group>
         <Segment>
           <SearchBar />
          </Segment>
            <MailViewList messages={ messages }/>
        </Segment.Group>
      </div>
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