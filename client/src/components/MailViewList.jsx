
import React from 'react';
import { Segment } from 'semantic-ui-react';
import MailViewListEntry from './MailViewListEntry.jsx';
import { Table, Grid } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 
var currentColor = -1;


class MailViewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'messages'
    };
  }

  handleMessageClick() {
    this.setState({ view: 'read' });
  }

  render() {
    const { messages } = this.props;
    const { view } = this.state;
  
    return (
      <div>
        { view === 'read' && (
        <Redirect from={'/'} push to={{
          pathname: '/message'
        }}/>
        )}
        <Table>
        <Table.Body>
          {messages.map((message, index) => {
            currentColor++;
            if (currentColor > messages.length) { currentColor = -1; }
            return <MailViewListEntry key={index} message={message} onClick={this.handleMessageClick.bind(this)} />;
          })}
        </Table.Body>
        </Table>
      </div>
    );

  }
}

export default MailViewList;