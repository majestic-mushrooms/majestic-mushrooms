import React from 'react';
import { Icon, Table, Segment, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ContactsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Contacts' 
    }
  }


  handleContactClick(email) {
    this.props.setNewView('compose');
  }


  render() {
    // TODO: email click makes email go to compose
    var str = `mailto:${this.props.contact.email}`
    return (
      
      <Table.Row> 
        <Table.Cell>
          <span onClick={ () => { this.handleContactClick(this.props.contact.email); }}>{this.props.contact.name}</span>     
        </Table.Cell>
        
        <Table.Cell>
          <a href={str}>{this.props.contact.email}</a>
        </Table.Cell>
        
        <Table.Cell textAlign="right">
            <span>{this.props.contact.phone_numbers[0]}</span>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default ContactsItem;

