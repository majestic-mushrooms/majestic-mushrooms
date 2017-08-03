const initialFolderState = { 
  folders: [], 
  inboxId: null,
  currentId: null
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
  case 'SET_CURRENT_FOLDER':
    return {
      ...state,
      currentId: action.currentId
    }
  
  default: 
    return state;
  }
};

