import React from 'react';
import SearchBar from './SearchBar.jsx';
import { Divider, Segment, } from 'semantic-ui-react';
import MailViewList from './MailViewList.jsx';
import MailViewListContainer from '../containers/MailViewListContainer.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addMessages } from '../actions';
import parseMessages from './utils/messagesParser';

class Body extends React.Component {
  constructor(props) {
    console.log('Inside Body.jsx constructor ***: ', props);
    super(props);
    this.state = { 
      messages: [],
      visible: true
    };

  }

  componentWillMount() {
    // console.log('Inside Body.jsx componentWillMount() FIRST: ', this.props);
    let { msg, setMessages } = this.props;
    const app = this;
    let now = Date.now();
    now = new Date(now);
    const today = now.getMonth() + '/' + now.getDate() + '/' + ('' + now.getFullYear()).substr(-2);

    axios.get('/api/messages/').then(response => {
      const retrievedMessages = parseMessages(response.data, today);
      app.setState({
        messages: retrievedMessages
      });
      console.log('Inside Body.jsx() componentWillMount() B4***', this.props.msg);
      setMessages(retrievedMessages);
      console.log('Inside Body.jsx() componentWillMount() AFTA***', this.props.msg);

    });
  }

  handleSearch(searchQuery) {
    let now = Date.now();
    now = new Date(now);
    const today = now.getMonth() + '/' + now.getDate() + '/' + ('' + now.getFullYear()).substr(-2);

    axios.post('api/search', searchQuery) 
      .then(response => {
        const searchedMessages = parseMessages(response.data, today);
        this.setState({messages: searchedMessages});
      })
      .catch(err => { console.log('Error searching emails ', err); });
  }

  render() {
    const { msg } = this.props;
    console.log('Inside Body.jsx RENDER: ', msg);
    return (
      <div>
        <Divider hidden />
        <SearchBar onSearch={this.handleSearch.bind(this)} style={{marginBottom: '20px'}}/>
        <Divider hidden />
        <MailViewListContainer messages={msg} style={{border: '0'}}/>
      </div>
    );
  }
}

export default Body;