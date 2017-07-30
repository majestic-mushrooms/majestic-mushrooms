
const initialContactsState = {
    contacts: []
}
    
export const ContactsReducer = (state = initialContactsState, action) => {
  
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
