import { connect } from 'react-redux';
import { setAccount, modifyMessage, addMessage, setFolders } from '../actions';
import App from '../App.jsx';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    view:     state.view 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAccountDetails: (account, token) => {
      dispatch(setAccount(account, token));
    },
    modifyMessage: (modifiedMessage) => {
      dispatch(modifyMessage(modifiedMessage));
    },
    addMessage: (newMessage) => {
      dispatch(addMessage(newMessage));
    },
    setRetrievedFolders: (folders) => {
      dispatch(setFolders(folders));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);