import { combineReducers } from "redux";
import user from "./reducers/user"; 
import survey from './reducers/survey';


export default combineReducers({
	user,
	survey
});
