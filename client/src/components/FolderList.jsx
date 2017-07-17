import React from 'react';
import { Button, Segment, Input, Menu, Icon, Label } from 'semantic-ui-react'

class FolderList extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleItemClick(name) {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state || {}

    return(
      <Menu fluid vertical>
      <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
        <Label color='teal'>49,986</Label>
        Inbox
      </Menu.Item>

      <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
        <Label>51</Label>
        Spam
      </Menu.Item>

      <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
        <Label color="red">0</Label>
        Trash
      </Menu.Item>
  

      <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
        <Label color="blue">5</Label>
        Drafts
        </Menu.Item>

      
      <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
      <Label color="olive"> 5,643</Label>
      Work
      </Menu.Item>


      <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
      <Label color="brown">5</Label>
      Hack Reactor
      </Menu.Item>

      <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
      <Label color="pink">361</Label>
      Family
      </Menu.Item>
      </Menu>
    );
  }
}

export default FolderList;
