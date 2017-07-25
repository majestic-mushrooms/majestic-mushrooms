import { connect } from 'react-redux';
import { setMessages, setSearchResults, setView } from '../actions';
import FolderList from '../components/FolderList.jsx';

const mapStateToProps = (state) => {
  return {
    view: state.view
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
