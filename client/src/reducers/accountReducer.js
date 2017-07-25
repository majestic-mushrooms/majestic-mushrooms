const defaultAccountState = {
  nylasToken:       undefined,
  isAuthenticated:  () => {
    return false;
  }
};

export const accountReducer = (state = defaultAccountState, action) => {
  console.log('Inside account REDUCER with action: ', action);
  switch (action.type) {

  case 'LOGOUT_USER':
    return {
      nylasToken: null,
      isAuthenticated: () => {
        return false;
      }
    };

  case 'SET_ACCOUNT':
    action.account.nylasToken = action.token;
    action.account.isAuthenticated = () => {
      return true;
    }
    
    return {
      ...action.account,
    };
  
    
  default: 
    return state;
  }
};



