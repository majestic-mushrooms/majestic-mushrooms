import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import FolderList from './FolderList.jsx';
import AiLog from './AiLog.jsx';

class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: true,
      activeItem: 'tab1' 
    };
  }

  handleItemClick(e, { name }) {
    preventDefault(e);
    this.setState({ activeItem: name })
  }

  render() {
    const { visible } = this.state
    const { activeItem } = this.state

    var display = null;

    if (this.state.activeItem === 'tab1') {
      display =  <FolderList />
    } else {
      display = <AiLog />
    }

    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item name='tab1' active={activeItem === 'tab1'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item name='tab2' active={activeItem === 'tab2'} onClick={this.handleItemClick.bind(this)} />
        </Menu>

        <Segment attached='bottom'>
          {display}
        </Segment>
      </div>
    )
  }
}

export default RightMenu;