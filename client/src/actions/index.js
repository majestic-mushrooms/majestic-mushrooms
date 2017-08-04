
export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export const setAccount = (account, token) => {
  return {
    type:     'SET_ACCOUNT',
    account:   account,
    token:    token
  };
};


export const addMessage = (messageObj) => {
  return {
    type:       'ADD_MESSAGE',
    color:      messageObj.color,
    from:       messageObj.from,
    message_id: messageObj.message_id,
    subject:    messageObj.subject,
    snippet:    messageObj.snippet,
    timestamp:  messageObj.timestamp,
    unread:     messageObj.unread
  };
};

export const modifyMessage = (message) => {
  return {
    type:      'MODIFY_MESSAGE',
    message:    message
  };
}

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

export const filterMessages = (messages) => {
  return {
    type:       'FILTER_MESSAGES',
    messages:   messages
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
  case 'DisplayMessage':
    return {
      type:       'SET_VIEW_TO_DISPLAY_MESSAGE',
      view:       viewName
    };
  case 'Waiting':
    return {
      type:       'SET_VIEW_TO_WAITING',
      view:       viewName
    };
  case 'Contacts':
  return {
    type:       'SET_VIEW_TO_CONTACTS',
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
    view:         'Read',
    thread:       currentThread
  };
};

export const clearCurrentThread = () => {
  return {
    type:         'CLEAR_CURRENT_THREAD'
  };
};

export const setAreResults = (boolean) => {
  return {
    type:         'SET_ARE_RESULTS',
    areResults:   boolean
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

export const setPage = (newPage) => {
  return {
    type:         'SET_PAGE',
    page:         newPage
  };
};

export const setContacts = (contacts) => {
  return {
    type:       'SET_CONTACTS',
    contacts:   contacts,
    view:         'Contacts'  
  };
};

export const setFolders = (folders) => {
  return {
    type:       'SET_FOLDERS',
    folders:     folders
  };
};

export const setInbox = (inboxId) => {
  return {
    type:       'SET_INBOX',
    inboxId:     inboxId
  };
};

export const setTrash = (trashId) => {
  return {
    type:       'SET_TRASH',
    trashId:     trashId
  };
};

export const setCurrentFolder = (currentId) => {
  return {
    type:       'SET_CURRENT_FOLDER',
    currentId:   currentId
  };
};