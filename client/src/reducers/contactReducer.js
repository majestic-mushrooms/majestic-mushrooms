
const initialContactState = {
    contacts: []
}
    
export const contactReducer = (state = initialContactState, action) => {
  
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.contacts,
        view: "Contacts"
    };
  
  default: 
    return state;
  }
};
