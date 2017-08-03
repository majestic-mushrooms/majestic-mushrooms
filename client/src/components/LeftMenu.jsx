import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { today } from './utils/dateTimeHelper';
import { parseMessage } from './utils/messagesHelper';


const onClickLogOut = (props) => {
  const { setNewView } = props;
  
  axios.get('/logout')
  .then( res => {
    window.token = null;
    setNewView('Logout');
  })
  .catch( err => {
    console.log('Error calling /logout from LeftMenu.jsx', err);
  });
};

const onClickInbox = (props) => {
  const { setFilteredMessages, setNewView, setPage, setAreResults, setCurrentFolder } = props;
  setNewView('Inbox'); 
  setPage(1);
  setCurrentFolder(this.props.folders.inboxId);
  axios.get('/api/folders/' + this.props.folders.inboxId).then(response => {
    setFilteredMessages(parseMessage(response.data, today)); 
    setAreResults(true); 
  });
};

const LeftMenu = (props) => {
  const { view, setNewView, setPage, setAreResults } = props;
  return (
    <div>
      { view === 'Logout' && (
        <Redirect from={'/'} push to={'/'}/>
      )}

    <Sidebar as={Menu} animation='push' visible={true} icon='labeled' vertical inverted fixed="left" className='sideBar'>
      <Menu.Item as={Link} to='/' onClick={onClickInbox.bind(this)} name='mail' >
        <Icon name='inbox' />
        Inbox
      </Menu.Item>
    
      <Menu.Item as={Link} to='/compose' name='compose' onClick={ () => { setNewView('Compose'); }}>
        <Icon name='mail' />
          Compose
      </Menu.Item>

      <Menu.Item as={Link} to='/contacts' name='contacts' onClick={ () => { setNewView('Contacts'); }} >
        <Icon name='address book' />
        Contacts
      </Menu.Item>

      <Menu.Item onClick={onClickLogOut.bind(this, props)} name='logout'>
      <Icon name='log out' />
      Logout
      </Menu.Item>

    </Sidebar>
    </div>
  );
  
};

export default LeftMenu;