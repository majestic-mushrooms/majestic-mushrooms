import { connect } from 'react-redux';
import { setAccount, modifyMessage, addMessage } from '../actions';
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);