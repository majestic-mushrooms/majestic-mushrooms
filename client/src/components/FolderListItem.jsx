import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Menu, Label, Icon } from 'semantic-ui-react';

class FolderListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const { activeItem } = this.state || {};

    return (
      <Menu.Item onClick={()=>{ this.props.filter(this.props.folder.folder_id); }} name={this.props.folder.display_name} active={activeItem === this.props.folder.display_name } name='mail' >
        <Label color={this.props.folder.color}>{this.props.folder.count}</Label>
        <Icon name='folder outline'></Icon>
        {this.props.folder.display_name}
      </Menu.Item>
    );
  }
}

export default FolderListItem;