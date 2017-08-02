import { messagesReducer } from './messagesReducer.js';
import { accountReducer } from './accountReducer.js';
import { viewReducer } from './viewReducer.js';
import { threadsReducer } from './threadsReducer.js';
import { searchReducer } from './searchReducer.js';
import { foldersReducer } from './foldersReducer.js';
import { pageReducer } from './pageReducer.js';
import { contactReducer } from './contactReducer.js';
import { combineReducers } from 'redux';

const emailApp = combineReducers( {
  messages:       messagesReducer,
  search:         searchReducer,
  account:        accountReducer,
  view:           viewReducer,
  threads:        threadsReducer,
  folders:        foldersReducer,
  page:           pageReducer,
  contacts:       contactReducer,
});


export default emailApp;