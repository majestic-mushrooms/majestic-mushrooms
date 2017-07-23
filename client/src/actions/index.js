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
  console.log('Inside addMessages action with messages passed in: ', messages);
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
  console.log('Inside setView ACTIONS with viewName: ', viewName);
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
  case 'Read':
    return {
      type:       'SET_VIEW_TO_READ',
      view:       viewName
    };

  default:
    return {
      type:       'SET_VIEW_TO_INBOX',
      view:       'Inbox'
    };
  }
};

export const setCurrentMessage = (currentMessage) => {
  return {
    type:         'SET_CURRENT_MESSAGE',
    message:      currentMessage
  };
};

export const clearCurrentMessage = () => {
  return {
    type:         'CLEAR_CURRENT_MESSAGE'
  };
};

export const setCurrentThread = (currentThread) => {
  console.log('Inside ACTION setCurrentThread: ', currentThread);
  return {
    type:         'SET_CURRENT_THREAD',
    thread:       currentThread
  };
};

export const clearCurrentThread = () => {
  return {
    type:         'CLEAR_CURRENT_THREAD'
  };
};