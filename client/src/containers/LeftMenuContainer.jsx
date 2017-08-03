import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu.jsx';
import { setView, setPage, setAreResults, filterMessages } from '../actions';

const mapStateToProps = (state) => {
  return {
    view:  state.view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewView: (viewName) => {
      dispatch(setView(viewName));
    },
    setPage: (page) => {
      dispatch(setPage(page));
    },
    setAreResults: (boolean) => {
      dispatch(setAreResults(boolean));
    },
    setFilteredMessages: (newMessages) => {
      dispatch(filterMessages(newMessages));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu);

