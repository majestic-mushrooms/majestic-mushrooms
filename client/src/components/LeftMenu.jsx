import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      visible: true,
      activeItem: 'tab1' 
    };
  }

  handleClick(e, { name }) {
    // do things to the state of the app inherited as props
  }

  render() {
    const { visible } = this.state
    return (
      <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted color='blue' fixed="left">
        <Menu.Item name='mail' onClick={this.handleClick.bind(this)}>
          <Icon name='file text outline' />
          Write Mail
        </Menu.Item>
        <Menu.Item name='mail'>
          1
        </Menu.Item>
        <Menu.Item name='camera' onClick={this.handleClick.bind(this)}>>
          <Icon name='camera' />
          ??
        </Menu.Item>
      </Sidebar>
    )
  }
}

export default LeftMenu;