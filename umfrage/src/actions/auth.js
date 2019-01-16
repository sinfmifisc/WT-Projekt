import api from '../api';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

export const userLoggedIn = (user, username) => ({
	  type: USER_LOGGED_IN,
	  user,
	  username
});
export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
});


export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
	console.log(credentials);
	   localStorage.current_token = user.token;
	   localStorage.current_user = user.username;
	   dispatch(userLoggedIn(user, credentials.username))
	});

export const logout = () => dispatch =>{
	localStorage.removeItem('current_token');
	localStorage.removeItem('current_user');
	dispatch(userLoggedOut());
};
