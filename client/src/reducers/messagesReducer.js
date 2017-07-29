
export const messagesReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return [
      action,
      ...state
    ]

  case 'REMOVE_MESSAGE':
    return state.filter( message => message.id !== action.messageId);

  case 'ADD_MESSAGES':
    return state.concat(action.messages);
  
  case 'SET_MESSAGES':
    return action.messages;
  
  case 'CLEAR_MESSAGES':
    return [];

  case 'MODIFY_MESSAGE':
    return state.map( message => {
      if (message.message_id === action.message.message_id) {
        return { ...action.message };
      }
      return message;
    });
    
  case 'SET_SEARCH_RESULTS':
    return action.messages;
    
  case 'FILTER_MESSAGES':
    return action.messages;
  
  default: 
    return state;
  }

};

