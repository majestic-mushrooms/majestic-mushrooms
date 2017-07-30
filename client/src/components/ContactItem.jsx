import React from 'react';
import { Icon, Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ContactsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false
    };
  }

  render() {

    return (
    
        <Table.Row 
          // onClick={ () => {this.handleContactClick(contact.contact_id, contactIndex, contact.unread);} }
          onMouseEnter={() => {this.setState({ showButton: true });}}
          onMouseLeave={() => { this.setState({ showButton: false }); }}>

          <Table.Cell width="4">
            <span style={{fontWeight: weight}}>#</span>
          </Table.Cell>

          <Table.Cell>
            <span style={{fontWeight: weight}}>{contact.subject}</span>
          </Table.Cell>

          <Table.Cell width="3" textAlign="right">
            {this.state.showButton === true ? 
            ( 
              <div>
                <Icon name="reply" onClick={ (e) => { onClick(e, contact.contact_id); }}/>
                <Icon name="trash outline" onClick={ (e) => { this.deleteContact(e, contact.contact_id); }}/>
              </div>
            ) : (
              <span>{contact.timestamp}</span>
            )}
          </Table.Cell>
        </Table.Row>
      
    );
  }
}


export default ContactsItem;

