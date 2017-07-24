
export const viewReducer = (state = 'Inbox', action) => {
  console.log('Inside viewReducer with action: ', action.type, ' and view to be set: ', action.view);
  switch(action.type) {
  case 'SET_VIEW_TO_INBOX':
    return action.view;
  case 'SET_VIEW_TO_FOLDER':
    return action.view;
  case 'SET_VIEW_TO_SEARCH':
    return action.view;
  case 'SET_VIEW_TO_COMPOSE':
    return action.view;
  case 'SET_VIEW_TO_READ':
    return action.view;
  case 'SET_CURRENT_MESSAGE':
    return action.view;
  default:
    return 'Inbox';
  }

};