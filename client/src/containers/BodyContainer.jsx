import { connect } from 'react-redux';
<<<<<<< HEAD
import { setSearchResults, setView } from '../actions';
=======
import { setMessages, setSearchResults, setView, setContacts } from '../actions';
>>>>>>> setRetrivedContacts dispatches setContacts
import Body from '../components/Body.jsx';

const mapStateToProps = (state) => {
  return {
    view:     state.view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchResults: (newMessages) => {
      dispatch(setSearchResults(newMessages));
    },
    setNewView: (viewName) => {
      dispatch(setView(viewName));
    },
    setRetrievedContacts: (newContacts) => {
      dispatch(setContacts(newContacts));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
