import { connect } from 'react-redux';
import { setView, setCurrentMessage } from '../actions';
import EmailList from '../components/EmailList.jsx';

const mapStateToProps = (state) => {
  return {
    messages:       state.messages,
    view:           state.view,
    searchResults:  state.search.searchResults
  };
};



export default connect(
  mapStateToProps,
  null
)(EmailList);

