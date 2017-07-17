import { connect } from 'react-redux';
import Main from './Main.js';

//mapStateToProps: transform Redux store state into props to pass to presentational component
// getMail determines what messages to pass to MailList > f to filter state.messages according to state.searchFilter & use in mapStateToProps

const getMail = (msgs, filter) => {
  switch (filter) {
  case 'SHOW_ALL':
    return msgs;
  case 'SHOW_SEARCHED':
    return msgs.filter(msg => msg.relatedSearch);
  }
};

const mapStateToProps = msgs => { 
  return {
    messages: getMail(state.messages, state.searchFilter)
  };
};

// TODO
const mapDispatchToProps = dispatch => {
  // return {
  //   onTodoClick: id => {
  //     dispatch(toggleTodo(id));
  //   }
  // };
};

const MailView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mail);

export default MailView;