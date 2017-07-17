import React, { Component } from 'react'
import { Sidebar, Menu, Icon, Label } from 'semantic-ui-react'

class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      visible: true
    };
  }

  handleClick(name) {
    // do things to the state of the app inherited as props
    this.props.handleViewChange(name);
  }

  render() {
    const { visible } = this.state
    return (
      <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted color='blue' fixed="left">
        <Menu.Item name='mail' onClick={() => this.handleClick('main')}>
          <Icon name='file text outline' />
        </Menu.Item>
        <Menu.Item name='mail'>
        <Icon name='search' color="green" inverted circular link />
        </Menu.Item>
      </Sidebar>
    )
  }
}

export default LeftMenu;