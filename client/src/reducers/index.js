import { messagesReducer } from './messagesReducer.js';
import { authReducer } from './authReducer.js';
import { viewReducer } from './viewReducer.js';
import { combineReducers } from 'redux';
  
const emailApp = combineReducers( {
  messages: messagesReducer,
  auth:     authReducer,
  view:     viewReducer
});


export default emailApp;