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
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }
  
  filterMessages(labelId) {
    const { setFilteredMessages, setPage, setAreResults, setNewView } = this.props;
    setNewView('Inbox');
    setPage(1);
    axios.get('/api/folders/' + labelId)
      .then(response => {
        if (response.data.length > 0){
          setAreResults(true);
          setFilteredMessages(parseMessage(messages.data, today));
        } else {
          console.log('No folder messages found');
          setNewView('Inbox');
          setAreResults(false);
        }
      });
  }
 
  render() {
    const { activeItem } = this.state || {};
    return (
      <div className='rightBar'>
        {this.props.folders.length === 0 ? (
          <div></div>
        ) : (
          <div>
            <Divider hidden />
            <Menu fluid vertical>
              {this.props.folders.map((folder, key) => {
                return <FolderListItem as={Link} to='/' folder={folder} filter={this.filterMessages} key={key} />;
              })}
            </Menu>

          </div>
        )

        }
      </div>
    );
  }
}

export default FolderList;