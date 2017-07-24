import { connect } from 'react-redux';
import Search from '../components/Search.jsx';
import { setSearchQueryAndResults } from '../actions';

const mapStateToProps = (state) => {
  return {
    view:  state.view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearch: (searchQuery, searchResults) => {
      dispatch(setSearchQueryAndResults(searchQuery, searchResults));
    }
  };
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;