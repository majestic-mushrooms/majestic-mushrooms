import { connect } from 'react-redux';
import { setAccount, setMessages, setFolders, addMessage, modifyMessage } from '../actions';
import App from '../App.jsx';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    view:     state.view,
    account:  state.account
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
    addMessage: (message) => {
      dispatch(addMessage(message));
    },
    modifyMessage: (message) => {
      dispatch(modifyMessage(message));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);