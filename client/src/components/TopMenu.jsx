import React from 'react';
import { Button, Segment, Input, Menu, Icon } from 'semantic-ui-react'

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Menu attached='top' inverted color='blue'>
          <Menu.Item>
            <Icon name='content' size='big'></Icon>
            Inbox
          </Menu.Item>

          <Menu.Item>
            <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>

          <Menu.Item position='right'>
            <Input action={{ type: 'submit', content: 'Go' }} placeholder='Navigate to...' />
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default TopMenu;




