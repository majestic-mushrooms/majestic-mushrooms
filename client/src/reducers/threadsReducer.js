
const initialThreadsState = {
  currentMessage: '',
  currentThread: []
}
  
export const threadsReducer = (state = initialThreadsState, action) => {
  console.log('Inside threadsReducer with action ', state, action.type, action.message, action.thread);
  switch (action.type) {
  case 'SET_CURRENT_MESSAGE':
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

