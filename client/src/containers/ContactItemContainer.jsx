import { connect } from 'react-redux';
import { setView } from '../actions';
import ContactItem from '../components/ContactItem.jsx';

const mapStateToProps = (state) => {
  return {
    contacts:       state.contacts,
    view:           state.view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentMessage: (newContact, contactIndex) => {
      dispatch(setCurrentMessage(newContact, contactIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactItem);

