const defaultAuthState = {
  nylasToken: undefined,
  isAuthenticated: () => {
    return false;
  }
};

export const authReducer = (state = defaultAuthState, action) => {
  console.log('Inside authReducer with action: ', action);
  switch (action.type) {
  case 'SET_TOKEN':
    return {
      nylasToken: action.token,
      isAuthenticated: () => {
        return true;
      }
    };
  case 'LOGOUT_USER':
    return {
      nylasToken: null,
      isAuthenticated: () => {
        return false;
      }
    };
    
  default: 
    return state;
  }
};



