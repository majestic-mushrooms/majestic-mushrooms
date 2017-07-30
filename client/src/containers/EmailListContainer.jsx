import { connect } from 'react-redux';
import { setView, setCurrentMessage, setPage } from '../actions';
import EmailList from '../components/EmailList.jsx';

const mapStateToProps = (state) => {
  return {
    messages:       state.messages,
    view:           state.view,
    searchResults:  state.search.searchResults,
    page:           state.page,
    areResults:     state.search.areResults
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (page) => {
      dispatch(setPage(page));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailList);

