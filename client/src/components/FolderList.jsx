import React from 'react';
import { Divider, Button, Segment, Input, Menu, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import FolderListItem from './FolderListItem.jsx';

class FolderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: true,
      activeItem: 'Folders',
      folders: []
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillMount() {
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
    const { activeItem } = this.state || {};

    return (
      <div>
        <Divider hidden />
        <Menu fluid vertical>
          {this.state.folders.map((folder, key) => {
            return <FolderListItem folder={folder} filter={this.filterMessages} key={key}/>;
          })}
        </Menu>
      </div>
    );
  }
}

export default FolderList;