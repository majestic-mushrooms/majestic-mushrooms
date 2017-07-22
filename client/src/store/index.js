import emailApp from '../reducers';
import { createStore } from 'redux';

const store = createStore(emailApp);

export default store;