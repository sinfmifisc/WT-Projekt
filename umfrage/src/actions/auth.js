import api from "../api";
import { USER_LOGGED_IN } from "../types";

export const userLoggedIn = user => ({
	  type: USER_LOGGED_IN,
	  user
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
	   localStorage.current_token = user.token;
	   dispatch(userLoggedIn(user))
	});
