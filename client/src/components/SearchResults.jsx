import React, { Component } from 'react';

class Search extends React.Component {
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


  handleSearch(searchQuery) {
    const { setSearchResults } = this.props;

    axios.post('api/search', searchQuery) 
      .then(response => {
        setSearchResults(parseMessages(response.data, today));
      })
      .catch(err => { console.log('Error searching emails ', err); });
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

export default Search;