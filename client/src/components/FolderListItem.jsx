import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Menu, Label } from 'semantic-ui-react';

class FolderListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const { activeItem } = this.state || {};

    return (
      <Menu.Item name={this.props.folder.display_name} active={activeItem === this.props.folder.display_name } as={Link} to='/' name='mail' >
        <Label color={this.props.folder.color}>1</Label>
        {this.props.folder.display_name}
      </Menu.Item>
    );
  }
}

export default FolderListItem;