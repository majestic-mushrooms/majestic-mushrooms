import React, { Component } from 'react';
import { Search, Grid, Header, Input } from 'semantic-ui-react';

class SearchBar extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      search: ''
    };
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  handleSearch() {
    this.props.onSearch(this.state.search);
  }

  render() {
    
    return (
      <Input fluid id="searchbar"
        onKeyPress={e => { if (e.key === 'Enter') { this.handleSearch(); } }}
        onChange={this.handleSearchChange.bind(this)}
        icon={{ name: 'search', circular: true }}
      />
    );
  }
}

export default SearchBar;