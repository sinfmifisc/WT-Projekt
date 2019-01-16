import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";


export default function user(state = {token: '', user_name:''}, action){
	

	switch(action.type){
		case USER_LOGGED_IN:
			console.log(action.user);
			  return Object.assign({}, state, {
				token: action.user.token,
				user_name: action.username
			  })
		case USER_LOGGED_OUT:
			  return Object.assign({}, state, {
				token: '',
				user_name: ''
			});
		default: return state;
	}
}
