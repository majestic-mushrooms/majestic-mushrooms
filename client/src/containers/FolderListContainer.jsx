import { connect } from 'react-redux';
import { setMessages, setPage } from '../actions';
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
    setPage: (page) => {
      dispatch(setPage(page));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderList);
