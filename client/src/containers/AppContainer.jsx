import { connect } from 'react-redux';
import { setAccount, setMessages, setFolders, addMessage, modifyMessage, setInbox, setCurrentFolder } from '../actions';
import App from '../App.jsx';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    view:     state.view,
    account:  state.account,
    folders:  state.folders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAccountDetails: (account, token) => {
      dispatch(setAccount(account, token));
    },
    setRetrievedMessages: (retrievedMessages) => {
      dispatch(setMessages(retrievedMessages));
    },
    setRetrievedFolders: (folders) => {
      dispatch(setFolders(folders));
    },
    setInbox: (inboxId) => {
      dispatch(setInbox(inboxId));
    },
    addMessage: (message) => {
      dispatch(addMessage(message));
    },
    modifyMessage: (message) => {
      dispatch(modifyMessage(message));
    },
    setCurrentFolder: (folderId) => {
      dispatch(setCurrentFolder(folderId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);