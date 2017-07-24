
const initialSearchState = {
  searchQuery: '',
  searchResults: []
};

export const searchReducer = (state = {}, action) => {

  switch (action.type) {
  case 'SET_SEARCH':
    return {
      searchQuery:    action.query,
      searchResults:  action.results
    };
  case 'CLEAR_SEARCH':
    return {
      searchQuery:    '',
      searchResults:  []
    };

  
  default: 
    return state;
  }

};

