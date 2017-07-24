import { connect } from 'react-redux';
import ReadMail from '../components/ReadMail.jsx';
import { setCurrentThread } from '../actions';

const mapStateToProps = (state) => {
  return {
    currentMessage: state.threads.currentMessage,
    thread:         state.threads.currentThread,
    view:           state.view,
    threads:        state.threads
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setThread: (newThread) => {
      dispatch(setCurrentThread(newThread));
    }
  };
};

const ReadMailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadMail);

export default ReadMailContainer;