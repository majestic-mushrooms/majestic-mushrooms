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
    const { setSearchQueryAndResults, setAreResults } = this.props;
    const searchQuery = e.target.value.trim();
    console.log('setAreResults', setAreResults);
    axios.post('api/search', searchQuery) 
      .then(response => {
        console.log('searched', response);
        console.log('response', response.data);
        if (response.data.length > 0) {
          console.log(response.data.length); 
          setSearchQueryAndResults(searchQuery, parseMessage(response.data, today));
        } else { 
          console.log('INNN get more msgs');
          this.getMoreMessages(searchQuery); 
          console.log('search props NOW', this.props.search);
        }
      }).catch(err => { console.log('Error searching emails ', err); });
  }

  getMoreMessages(searchQuery) {
    console.log('getMoreMessages CALLED');
    const { setAreResults } = this.props;
    axios.get('api/search', {params: {query: searchQuery}})
      .then(response => {
        if (response.data > 0) {
          setSearchQueryAndResults(searchQuery, parseMessage(response.data, today));
        } else {
          console.log('****setAreResults set to FALSE');
          setAreResults(false);
        }
      });
  }

  render() {
    const { view } = this.props;
    const { areResults } = this.props.search;
    console.log('----- areResults in SEARCH', areResults);

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

