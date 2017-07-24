
import React from 'react';
import { Segment } from 'semantic-ui-react';
import EmailListItemContainer from '../containers/EmailListItemContainer.jsx';
import { Table, Grid, Dimmer, Loader, Image} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';


class EmailList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { view } = this.props;
    let messages =  (view === 'Search') ? this.props.searchResults : this.props.messages;
    return (
      <div>
        { view === 'Read' && (
          <Redirect from={'/'} push to={'/message'}/>
        )}


        {messages.length === 0 ? (
          <Image src='https://s-media-cache-ak0.pinimg.com/originals/d9/93/3c/d9933c4e2c272f33b74ef18cdf11a7d5.gif' centered size='small'/>
          ) : (
          <Table singleLine fixed>
            <Table.Body>
              {messages.map((message, index, array) => {
                return <EmailListItemContainer key={index} messageIndex={index}  />;
              })}
            </Table.Body> 
          </Table>
          )
        }
      </div>
    );

  }
}

export default EmailList;