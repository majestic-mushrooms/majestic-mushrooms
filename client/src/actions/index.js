export const setToken = (token) => {
  return {
    type:   'SET_TOKEN',
    token:  token 
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};


export const addMessage = (messageObj) => {
  return {
    type:       'ADD_MESSAGE',
    messageId:  messageObj.id,
    subject:    messageObj.subject
  };
};

export const removeMessage = (messageId) => {
  return {
    type:       'REMOVE_MESSAGE',
    messageId:   messageId
  };
};


export const addMessages = (messages) => {
  return {
    type:       'ADD_MESSAGES',
    messages:   messages
  };
};

export const clearMessages = () => {
  return {
    type:       'CLEAR_MESSAGES'
  };
};

export const setView = (viewName = 'Inbox') => {
 
  switch (viewName) {
  case 'Compose':
    return {
      type:       'SET_VIEW_TO_COMPOSE',
      view:       viewName
    };
  case 'Search':
    return {
      type:       'SET_VIEW_TO_SEARCH',
      view:       viewName
    };
  case 'Folder':
    return {
      type:       'SET_VIEW_TO_FOLDER',
      view:       viewName
    };

  default:
    return {
      type:       'SET_VIEW_TO_INBOX',
      view:       'Inbox'
    };
  }
};