import React from 'react';
import { Table } from 'semantic-ui-react';

// const colors = [
//   'red', 'orange', 'yellow', 'olive', 'green', 'teal',
//   'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
// ]; // for name icon colors

class InboxListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
    };
  }

  // put in Main
  // handleMessageClick() {
  //   this.setState({
  //     view: ''
  //   });
  // }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{props.from}</Table.Cell>
        <Table.Cell style={{fontWeight: 'bold'}}>{props.subject}</Table.Cell>
        <Table.Cell>{props.snippet}</Table.Cell>
      </Table.Row>
    );
  }
}

export default InboxListEntry;