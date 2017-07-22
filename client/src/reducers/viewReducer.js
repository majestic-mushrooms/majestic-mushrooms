
export const viewReducer = (state = 'Inbox', action) => {
 
  switch(action.type) {
  case 'SET_VIEW_TO_INBOX':
    return action.view;
  case 'SET_VIEW_TO_FOLDER':
    return action.view;
  case 'SET_VIEW_TO_SEARCH':
    return action.view;
  case 'SET_VIEW_TO_COMPOSE':
    return action.view;

  default:
    return 'Inbox';
  }

};