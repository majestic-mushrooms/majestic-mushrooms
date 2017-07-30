import { connect } from 'react-redux';
import { filterMessages, setFolders, setPage } from '../actions';
import FolderList from '../components/FolderList.jsx';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    folders: state.folders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilteredMessages: (newMessages) => {
      dispatch(filterMessages(newMessages));
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
