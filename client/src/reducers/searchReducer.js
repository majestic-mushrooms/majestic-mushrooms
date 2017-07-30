
const initialSearchState = {
  searchQuery: '',
  searchResults: [],
  areResults: true
};

export const searchReducer = (state = initialSearchState, action) => {
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
  case 'SET_ARE_RESULTS':
    return {
      areResults:    action.areResults
    };

  
  default: 
    return state;
  }

};

