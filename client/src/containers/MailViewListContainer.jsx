import { connect } from 'react-redux';
import { setView, setCurrentMessage } from '../actions';
import MailViewList from '../components/MailViewList.jsx';

const mapStateToProps = (state) => {
  return {
    messages:       state.messages,
    view:           state.view,
    currentMessage: state.threads.currentMessage
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

const MailViewListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MailViewList);

export default MailViewListContainer;