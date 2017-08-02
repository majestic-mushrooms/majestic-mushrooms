
export const viewReducer = (state = 'Inbox', action) => {
  switch (action.type) {
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
  case 'SET_VIEW_TO_LOGOUT':
    return action.view;
  case 'SET_CURRENT_MESSAGE':
    return action.view;
  case 'SET_SEARCH':
    return action.view;
  case 'SET_VIEW_TO_DISPLAY_MESSAGE':
    return action.view;
  case 'SET_VIEW_TO_WAITING':
    return action.view;
  case 'SET_VIEW_TO_CONTACTS':
    return action.view;

  default:
    return 'Inbox';
  }

};