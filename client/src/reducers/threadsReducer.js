
const initialThreadsState = {
  currentMessage: '',
  currentThread: []
}
  
export const threadsReducer = (state = initialThreadsState, action) => {
  
  switch (action.type) {
  case 'SET_CURRENT_MESSAGE':
    action.message.messageIndex = action.index;
    
    return {
      ...state,
      currentMessage: action.message
    };
  case 'SET_CURRENT_THREAD':
    return {
      ...state,
      currentThread: action.thread
    };

  case 'CLEAR_CURRENT_MESSAGE':
    return {
      ...state,
      currentMessage: ''
    };
  
  case 'CLEAR_CURRENT_THREAD':
    return {
      ...state,
      currentThread: ''
    };
    
  default: 
    return state;
  }

};

