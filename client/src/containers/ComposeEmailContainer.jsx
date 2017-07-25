import { connect } from 'react-redux';
import ComposeEmail from '../components/ComposeEmail.jsx';
import { setView } from '../actions';

const mapStateToProps = (state) => {
  return {
    view:     state.view,
    account:  state.account
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setView:  (viewName) => {
      dispatch(setView(viewName));
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposeEmail);