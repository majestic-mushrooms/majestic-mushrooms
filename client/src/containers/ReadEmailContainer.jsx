import { connect } from 'react-redux';
import ReadEmail from '../components/ReadEmail.jsx';
import { setCurrentThread, setCurrentMessage } from '../actions';

const mapStateToProps = (state) => {
  return {
    currentMessage: state.threads.currentMessage,
    thread:         state.threads.currentThread,
    messages:       state.messages,
    view:           state.view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setThread: (newThread) => {
      dispatch(setCurrentThread(newThread));
    },
    setCurrentMessage: (currentMessage, messageIndex) => {
      dispatch(setCurrentMessage(currentMessage, messageIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadEmail);

