import React from 'react';
import { Button, Segment, Input, Menu, Icon } from 'semantic-ui-react'

class AiLog extends React.Component {
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
      <Menu vertical>
          <Menu.Item>
            <Menu.Header>Analysis type 1</Menu.Header>

            <Menu.Menu>
              <Menu.Item name='enterprise' active={activeItem === 'enterprise'} onClick={this.handleItemClick} />
              <Menu.Item name='consumer' active={activeItem === 'consumer'} onClick={this.handleItemClick} />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Analysis type 2</Menu.Header>

            <Menu.Menu>
              <Menu.Item name='rails' active={activeItem === 'rails'} onClick={this.handleItemClick} />
              <Menu.Item name='python' active={activeItem === 'python'} onClick={this.handleItemClick} />
              <Menu.Item name='php' active={activeItem === 'php'} onClick={this.handleItemClick} />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Analysis type 3</Menu.Header>

            <Menu.Menu>
              <Menu.Item name='shared' active={activeItem === 'shared'} onClick={this.handleItemClick} />
              <Menu.Item name='dedicated' active={activeItem === 'dedicated'} onClick={this.handleItemClick} />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Analysis type 4</Menu.Header>

            <Menu.Menu>
              <Menu.Item name='email' active={activeItem === 'email'} onClick={this.handleItemClick}>
                E-mail Support
              </Menu.Item>

              <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick}>
                FAQs
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
    )
  }
}

export default AiLog;
