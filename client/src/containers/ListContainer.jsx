import { connect } from 'react-redux';
import { setView, setCurrentMessage } from '../actions';
import List from '../components/List.jsx';

const mapStateToProps = (state) => {
  return {
    messages:       state.messages,
    view:           state.view,
    searchResults:  state.search.searchResults
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewView: (viewName) => {
      dispatch(setView(viewName));
    },
    setMessageToDisplay: (newMessage) => {
      dispatch(setCurrentMessage(newMessage));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

