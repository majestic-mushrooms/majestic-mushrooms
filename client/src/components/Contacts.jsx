import React from 'react';
import ContactContainer from '../containers/ContactContainer.jsx';

import { Message, Divider, Table, Icon, Label, Image, Menu } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { WAIT_IMAGE } from './utils/stylesHelper.js';
import ContactItem from './ContactItem.jsx';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { setRetrievedContacts } = this.props;

    axios.get('/api/contacts').then( contacts => {
      setRetrievedContacts(contacts.data);
    })
    .catch( err => {
      console.log('Error getting contacts: ', err);
    });
  }

  handlePageNav(direction) {
    
    const { page, setPage } = this.props;

    if (direction === 'back') {
      if (page - 1 > 0) { setPage(page - 1); }
    } else {
      const maxPage = Math.ceil(this.props.contacts.length / 25);
      if (page + 1 <= maxPage) { setPage(page + 1); }
    }
  } 

  render() {
    const contacts = this.props.contacts.contacts;
    const { setNewView } = this.props;

    return (
      <div>
      <Divider hidden />    
      <Table singleLine fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
          </Table.Row>        
        </Table.Header>

        <Table.Body>
          {contacts.slice(1, contacts.length).map((contact, index) => {
              return <ContactItem key={index} contact={contact} contactId={contact.contact_id} setNewView={setNewView}/>;
            })}
        </Table.Body>
      </Table>
      </div>
    );
  }
}
    
export default Contacts;

// const contacts = this.props.contacts.contacts.slice(25 * (page - 1), 25 * page);

// {contacts.map((contact, index) => {
//   return <ContactItem key={index} contact={contact} contactId={contact.contact_id} />;
// })}

// <Icon name="chevron left" onClick={() => { this.handlePageNav('back'); }} />
// {page} / {Math.ceil(this.props.contacts.length / 25)} 
// <Icon name="chevron right" onClick={() => { this.handlePageNav('forward'); }} />
