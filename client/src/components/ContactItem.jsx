import React from 'react';
import { Icon, Table, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ContactsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      
      <Table.Row> 

      <Table.Cell>
      <span>{this.props.contact.name}</span>      
      </Table.Cell>
      
      <Table.Cell>
      <span>{this.props.contact.email}</span>      
      </Table.Cell>
      
      <Table.Cell textAlign="right">
          <span>{this.props.contact.phone_numbers[0]}</span>
      </Table.Cell>
      </Table.Row>
    );
  }
}

export default ContactsItem;

