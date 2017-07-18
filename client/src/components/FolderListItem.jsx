import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Menu, Label } from 'semantic-ui-react';

class FolderListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  getRandomColor() {
    var colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
    return colors[Math.floor(Math.random() * 12)];
  }
  render() {
    const { activeItem } = this.state || {};

    return (
      <Menu.Item name={this.props.folder.name} active={activeItem === this.props.folder.name } as={Link} to='/' name='mail' >
        <Label color={this.getRandomColor()}>49,986</Label>
        {this.props.folder.display_name}
      </Menu.Item>
    );
  }
}

export default FolderListItem;