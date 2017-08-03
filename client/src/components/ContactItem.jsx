import React from 'react';
import { Icon, Table, Segment, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ContactsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { view, setNewView } = this.props;
    
    return (
      
      <Table.Row>

        { view === 'Compose' && (
          <Redirect from={'/contacts'} push to={'/compose'}/>
        )}

        <Table.Cell>
          <span>{this.props.contact.name}</span>     
        </Table.Cell>
        
        <Table.Cell>
          <Menu.Item as={Link} to='/compose' onClick={ () => { setNewView('Compose'); }}>{this.props.contact.email}</Menu.Item>
        </Table.Cell>
        
        <Table.Cell textAlign="right">
            <span>{this.props.contact.phone_numbers[0]}</span>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default ContactsItem;
