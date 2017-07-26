export const pageReducer = (state = 1, action) => {
  switch(action.type) {
    case 'SET_PAGE':
      return action.page;

    default:
      return state;
  }

};