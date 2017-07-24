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

export const setMessages = (messages) => {
  return {
    type:       'SET_MESSAGES',
    messages:   messages
  };
};


export const setSearchResults = (messages) => {
  return {
    type:       'SET_SEARCH_RESULTS',
    messages:   messages,
    view:       'Search'

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
  case 'Read':
    return {
      type:       'SET_VIEW_TO_READ',
      view:       viewName
    };
  case 'Logout':
    return {
      type:       'SET_VIEW_TO_LOGOUT',
      view:       viewName
    };

  default:
    return {
      type:       'SET_VIEW_TO_INBOX',
      view:       'Inbox'
    };
  }
};

export const setCurrentMessage = (currentMessage, messageIndex) => {
  return {
    type:         'SET_CURRENT_MESSAGE',
    message:      currentMessage,
    view:         'Read',
    index:        messageIndex
  };
};

export const clearCurrentMessage = () => {
  return {
    type:         'CLEAR_CURRENT_MESSAGE'
  };
};

export const setCurrentThread = (currentThread) => {
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

export const setSearchQueryAndResults = (searchQuery, searchResults) => {
  return {
    type:         'SET_SEARCH',
    query:        searchQuery,
    results:      searchResults,
    view:         'Search'
  };
};