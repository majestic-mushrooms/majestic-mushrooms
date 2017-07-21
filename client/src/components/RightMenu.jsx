import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input, Label } from 'semantic-ui-react';
import FolderList from './FolderList.jsx';
import AiLog from './AiLog.jsx';
import axios from 'axios';

class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: true,
      activeItem: 'Folders',
      folders: []
    };
  }
  componentDidMount() {
    axios.get('/api/folders')
      .then(response => {
        console.log('this is response frm', response.data);
        this.setState({
          folders: response.data
        });
      });
    // axios.get('https://api.nylas.com/labels', {
    //   authorization: window.token
    //   //  { authorization: window.token }
    // }).then(response => {
    //   console.log('resp ==================== ', response.data);
    // });
  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }
  
  filterMessages(labelId) {
    console.log('label id', labelId);
    axios.get('/api/folders/' + labelId)
      .then(response => {
      //set messages state.
      });
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
          {activeItem === 'Folders' && <FolderList filter={this.filterMessages} folders={this.state.folders}/>}
          {activeItem === 'Filters' && <AiLog />}
        </Segment>
      </div>

    );
  }
}

export default RightMenu;