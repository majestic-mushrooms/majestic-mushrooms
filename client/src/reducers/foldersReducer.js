const initialFolderState = { 
  folders: [], 
  inboxId: null 
};

export const foldersReducer = (state = initialFolderState, action) => {
  switch (action.type) {
  
  case 'SET_FOLDERS':
    return {
      folders: action.folders
    };
  case 'SET_INBOX':
    return {
      ...state,
      inboxId: action.inboxId
    }
  
  default: 
    return state;
  }
};

