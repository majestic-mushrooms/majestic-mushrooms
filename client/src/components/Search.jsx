import React, { Component } from 'react';
import { Grid, Header, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { parseMessage } from './utils/messagesHelper';
import { today } from './utils/dateTimeHelper';


class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSearch(e) {
    const { setSearchQueryAndResults, setAreResults, setPage } = this.props;
    const searchQuery = e.target.value.trim();
    setAreResults(true);
    setPage(1);
    axios.post('api/search', searchQuery) 
      .then(response => {
        if (response.data.length > 0) {
          setSearchQueryAndResults(searchQuery, parseMessage(response.data, today));
        } else { 
          this.getMoreMessages(searchQuery); 
        }
      }).catch(err => { console.log('Error searching emails ', err); });
  }

  getMoreMessages(searchQuery) {
    const { setSearchQueryAndResults, setAreResults } = this.props;
    console.log('Asking API for more messages...');
    axios.get('api/search', {params: {query: searchQuery}})
      .then(response => {
        if (response.data.length > 0) {
          setSearchQueryAndResults(searchQuery, parseMessage(response.data, today));
        } else {
          console.log('No extra search results found');
          setAreResults(false);
        }
      })
      .catch(err => { console.log('Error getting extra search matches from Nylas'); });
  }

  render() {
    const { view } = this.props;
    const { areResults } = this.props.search;

    return (
      <div>
        { view === 'Search' && 
        <Redirect from={'/'} push to={'/'}/>
        }

        <Input fluid id="searchbar"
          onKeyPress={e => { if (e.key === 'Enter') { this.handleSearch(e); } }}
          icon={{ name: 'search', circular: true }}
        />
      </div>
    );
  }
}

export default Search;

