
import React from 'react';
import { Segment } from 'semantic-ui-react';
import EmailListItemContainer from '../containers/EmailListItemContainer.jsx';
import { Table, Grid, Dimmer, Loader, Image, Icon } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { WAIT_IMAGE } from './utils/stylesHelper.js';
import UserMessage from './UserMessage.jsx';


class EmailList extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageNav = this.handlePageNav.bind(this);
  }

  handlePageNav(direction) {
    const { page, setPage } = this.props;
    console.log('THIS', this, this.props);

    if (direction === 'back') {
      if (page - 1 > 0) { setPage(page - 1); }
    } else {
      const maxPage = Math.ceil(this.props.messages.length / 25);
      if (page + 1 <= maxPage) { setPage(page + 1); }
    }
  } 

  render() {
    const { view, page } = this.props;
    const messages =  (view === 'Search') ? this.props.searchResults : 
      this.props.messages.slice(25 * (page - 1), 25 * page);

    return (
      <div>
        { view === 'Read' && (
          <Redirect from={'/'} push to={'/message'}/>
        )}


        {messages.length === 0 ? (
          <Image src={WAIT_IMAGE} centered size='small'/>          
        ) : (
          <div>
            <Table singleLine fixed>
              <Table.Body>
                {messages.map((message, index, array) => {
                  index = (25 * (page - 1)) + index;
                  return <EmailListItemContainer key={index} messageIndex={index}  />;
                })}
              </Table.Body> 
            </Table>

            <Icon name="chevron left" onClick={() => { this.handlePageNav('back'); }} />
              {page} / {Math.ceil(this.props.messages.length / 25)} 
            <Icon name="chevron right" onClick={() => { this.handlePageNav('forward'); }} />
          </div>
          )
        }
      </div>
    );

  }
}

export default EmailList;
