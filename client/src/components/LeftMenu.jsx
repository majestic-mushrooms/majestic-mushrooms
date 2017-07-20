import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';


class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      visible: true,
      view: 'home' 
    };
  }

 
  onClickLogOut() {
    axios.get('/logout')
    .then( res => {
      window.token = null;
      this.setState({ view: 'loggedOut '});
    })
    .catch( err => {
      console.log('Error calling /logout from LeftMenu.jsx', err);
    });
  }


  render() {
    const { visible, view } = this.state;
    return (
      <div>

      <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted color='blue' fixed="left">
        <Menu.Item  as={Link} to='/' name='mail'  >
          <Icon name='inbox' />
          Inbox
        </Menu.Item>
      
        <Menu.Item as={Link} to='/compose' name='compose'>
          <Icon name='mail' />
            Compose Mail
        </Menu.Item>

        <Menu.Item as={Link} to='/contacts' name='contacts' >
          <Icon name='address book' />
          Contacts
        </Menu.Item>

        <Menu.Item onClick={this.onClickLogOut.bind(this)} name='logout'>
        <Icon name='log out' />
        Logout
        </Menu.Item>

      </Sidebar>
      </div>
    );
  }
}

export default LeftMenu;