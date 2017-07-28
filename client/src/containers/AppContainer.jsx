import { connect } from 'react-redux';
import { setAccount } from '../actions';
import App from '../App.jsx';

console.log(App, 'APP')

const mapStateToProps = (state) => {
  return {
    view:     state.view 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAccountDetails: (account, token) => {
      dispatch(setAccount(account, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);