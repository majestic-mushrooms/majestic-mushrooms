import { connect } from 'react-redux';
import { addMessages } from '../actions';
import Body from '../components/Body.jsx';

const mapStateToProps = (state) => {
  return {
    msg: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessages: (newMessages) => {
      dispatch(addMessages(newMessages));
    }
  };
};

const BodyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);

export default BodyContainer;