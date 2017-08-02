import { connect } from 'react-redux';
import { setMessages, setSearchResults, setView } from '../actions';
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
    setRetrievedMessages: (newMessages) => {
      dispatch(setMessages(newMessages));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
