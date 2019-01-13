import { combineReducers } from "redux";
import user from "./reducers/user"; 
import surveycreation from './reducers/surveycreation';


export default combineReducers({
	user,
	surveycreation
});
