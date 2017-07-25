import { connect } from 'react-redux';
import ComposeEmail from '../components/ComposeEmail.jsx';

const mapStateToProps = (state) => {
  console.log('Inside ACCOUNT mapSTateToProps: ', state);
  return {
    view:     state.view,
    account:  state.account
  };
};


export default connect(
  mapStateToProps,
  null
)(ComposeEmail);