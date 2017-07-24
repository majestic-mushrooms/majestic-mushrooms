import { connect } from 'react-redux';
import { setMessages } from '../actions';
import Body from '../components/Body.jsx';

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRetrievedMessages: (newMessages) => {
      dispatch(setMessages(newMessages));
    }
  };
};

const BodyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);

export default BodyContainer;