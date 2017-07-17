import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input, Label } from 'semantic-ui-react';
import FolderList from './FolderList.jsx';
import AiLog from './AiLog.jsx';

class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: true,
      activeItem: 'Folders' 
    };
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { visible } = this.state;
    const { activeItem } = this.state;

    return (
      <div>
      <Menu tabular size="large">
        <Menu.Item name='Folders' active={activeItem === 'Folders'} onClick={this.handleItemClick.bind(this)} />
        <Menu.Item name='Filters' active={activeItem === 'Filters'} onClick={this.handleItemClick.bind(this)} />
      </Menu>

      <Segment attached='bottom'>
        {activeItem === 'Folders' && <FolderList />}
        {activeItem === 'Filters' && <AiLog />}
      </Segment>
      </div>

    );
  }
}

export default RightMenu;