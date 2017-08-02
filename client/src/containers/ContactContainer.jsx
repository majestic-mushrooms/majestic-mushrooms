import { connect } from 'react-redux';
import { setView, setPage, setContacts } from '../actions';
import Contacts from '../components/Contacts.jsx';

const mapStateToProps = (state) => {
  return {
    contacts:       state.contacts,
    view:           state.view,
    page:           state.page    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (page) => {
      dispatch(setPage(page));
    },
    setRetrievedContacts: (newContacts) => {
      dispatch(setContacts(newContacts));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);

