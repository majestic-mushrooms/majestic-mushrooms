import { connect } from 'react-redux';
import { setCurrentMessage } from '../actions';
import EmailListItem from '../components/EmailListItem.jsx';

const mapStateToProps = (state) => {
  return {
    messages:       state.messages,
    view:           state.view,
    searchResults:  state.search.searchResults,
    folders:        state.folders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentMessage: (newMessage, messageIndex) => {
      dispatch(setCurrentMessage(newMessage, messageIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailListItem);

