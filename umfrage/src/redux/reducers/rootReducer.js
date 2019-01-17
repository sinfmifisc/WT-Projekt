import { combineReducers } from 'redux';
import user from './user.js'; 
import surveycreation from './surveycreation';


export default combineReducers({
	user,
	surveycreation
});
