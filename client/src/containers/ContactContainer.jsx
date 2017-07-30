import { connect } from 'react-redux';
import { setView, setCurrentMessage, setPage } from '../actions';
import Contacts from '../components/Contacts.jsx';

const mapStateToProps = (state) => {
  return {
    contacts:       state.contacts,
    view:           state.view,
    searchResults:  state.search.searchResults,
    page:           state.page
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
)(Contacts);

