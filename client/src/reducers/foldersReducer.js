const initialFolderState = { 
  folders: [], 
  inboxId: null,
  trashId: null,
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
    };
  case 'SET_TRASH':
    return {
      ...state,
      trashId: action.trashId
    };
  case 'SET_CURRENT_FOLDER':
    return {
      ...state,
      currentId: action.currentId
    };
  
  default: 
    return state;
  }
};

