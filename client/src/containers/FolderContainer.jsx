import { connect } from 'react-redux';
import { setMessages } from '../actions';
import FolderList from '../components/FolderList.jsx';

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilteredMessages: (newMessages) => {
      dispatch(setMessages(newMessages));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderList);
