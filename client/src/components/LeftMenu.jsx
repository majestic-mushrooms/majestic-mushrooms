import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';


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
  setNewView('Inbox'); 
  const {setFilteredMessages, setNewView, setPage, setAreResults} = props;
  axios.get('/api/messages').then(response => {
    setFilteredMessages(response.data);
    setPage(1); 
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
      <Menu.Item as={Link} to='/' name='mail' onClick={onClickInbox.bind(this, props)} >
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