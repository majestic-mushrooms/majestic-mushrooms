import { connect } from 'react-redux';
import Search from '../components/Search.jsx';
import { setSearchQueryAndResults } from '../actions';

const mapStateToProps = (state) => {
  return {
    view: state.view,
    search: state.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchQueryAndResults: (searchQuery, searchResults) => {
      dispatch(setSearchQueryAndResults(searchQuery, searchResults));
    },
    setAreResults: (boolean) => {
      dispatch(setAreResults(boolean));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

