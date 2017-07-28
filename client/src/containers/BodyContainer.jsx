import { connect } from 'react-redux';
import { setMessages, setSearchResults, setView, setAccount } from '../actions';
import Body from '../components/Body.jsx';

const mapStateToProps = (state) => {
  return {
    view:     state.view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRetrievedMessages: (newMessages) => {
      dispatch(setMessages(newMessages));
    },
    setSearchResults: (newMessages) => {
      dispatch(setSearchResults(newMessages));
    },
    setNewView: (viewName) => {
      dispatch(setView(viewName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
