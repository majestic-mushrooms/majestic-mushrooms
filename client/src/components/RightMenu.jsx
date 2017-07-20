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
    // axios.get('/api/folders')
    //   .then(response => {
    //     console.log('this is response frm', response.data);
    //     this.setState({
    //       folders: response.data
    //     });
    //   });
    console.log(window.token, window.token.length);
    // axios.get('https://api.nylas.com/labels', {
    //   authorization: window.token
    //   //  { authorization: window.token }
    // }).then(response => {
    //   console.log('resp ==================== ', response.data);
    // });
    const authString = 'Bearer ' + window.token;
    let arr = [];
    
    axios.get('https://api.nylas.com/labels', {
      headers: { Authorization: authString }
    }).then(response => {
      console.log('res', response.data);
      let colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].color = colors[Math.floor(Math.random() * 12)];
        arr.push(response.data[i]);
      }
      for (var i = 0; i < arr.length; i++) {
        axios.get(`https://api.nylas.com/messages?in=${arr[i].display_name}&unread=true&view=count`, {
          headers: { Authorization: authString }
        }).then(response => {
          console.log(response.data);
          arr[i].count = response.data.count;
          setTimeout(() => {}, 500);
        });
      }
    }).then(() =>{
      this.setState({
        folders: arr
      });
    });

  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  // getFolders(e) {
  //   axios.get('/api/folders')
  //     .then(response => {
  //       console.log('this is response frm', response.data);
  //     });
  // }
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
          {activeItem === 'Folders' && <FolderList folders={this.state.folders}/>}
          {activeItem === 'Filters' && <AiLog />}
        </Segment>
      </div>

    );
  }
}

export default RightMenu;