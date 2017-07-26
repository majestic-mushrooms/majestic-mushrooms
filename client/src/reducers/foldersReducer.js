export const foldersReducer = (state = [], action) => {
  switch (action.type) {
  
  case 'FILTER_MESSAGES':
    return action.messages;
  
  default: 
    return state;
  }
};

