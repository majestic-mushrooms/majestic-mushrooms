import React from 'react';
import { Divider, Button, Segment, Input, Menu, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import FolderListItem from './FolderListItem.jsx';
import { today } from './utils/dateTimeHelper';
import { parseMessage } from './utils/messagesHelper';

class FolderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: 'Folders',
      folders: []
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
  }

  componentWillMount() {
    axios.get('/api/folders')
      .then(response => {
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
    const { setFilteredMessages, setPage } = this.props;
    axios.get('/api/folders/' + labelId)
      .then(response => {
        setFilteredMessages(parseMessage(response.data, today));
        setPage(1);
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