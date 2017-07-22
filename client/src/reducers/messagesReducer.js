
const message = (state, action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return {
      id: action.messageId,
      subject: action.subject,
    };
  default: 
    return state;
  }
};
  
export const messagesReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return [
      ...state,
      message(undefined, action)
    ];
  case 'REMOVE_MESSAGE':
    return state.filter( message => message.id !== action.messageId);

  case 'ADD_MESSAGES':
    return state.concat(action.messages);
  
  case 'CLEAR_MESSAGES':
    return [];
    
  default: 
    return state;
  }

};
