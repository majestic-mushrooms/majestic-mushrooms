import { messagesReducer } from './messagesReducer.js';
import { authReducer } from './authReducer.js';
import { viewReducer } from './viewReducer.js';
import { threadsReducer } from './threadsReducer.js';
import { searchReducer } from './searchReducer.js';
import { combineReducers } from 'redux';
  
const emailApp = combineReducers( {
  messages:       messagesReducer,
  search:         searchReducer,
  auth:           authReducer,
  view:           viewReducer,
  threads:        threadsReducer,
  
});


export default emailApp;