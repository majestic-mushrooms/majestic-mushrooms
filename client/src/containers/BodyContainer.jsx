import { connect } from 'react-redux';
import { setMessages, setSearchResults } from '../actions';
import Body from '../components/Body.jsx';



const mapDispatchToProps = (dispatch) => {
  return {
    setRetrievedMessages: (newMessages) => {
      dispatch(setMessages(newMessages));
    },
    setSearchResults: (newMessages) => {
      dispatch(setSearchResults(newMessages));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Body);
