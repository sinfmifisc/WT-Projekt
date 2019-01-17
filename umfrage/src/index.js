import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { userLoggedIn, userLoggedOut } from './actions/auth';
import {verifyToken} from './components/routes/UserRoute'



export const store = createStore(
		  rootReducer,
		  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.current_token){
	const auth = verifyToken(localStorage.current_token);
	if(auth){
		const user = { token: localStorage.current_token};
		const name = localStorage.current_user;
		store.dispatch(userLoggedIn(user, name));
	}
	else{
		localStorage.removeItem('current_token');
		localStorage.removeItem('current_user');

		store.dispatch(userLoggedOut());
	}
	
}



		
		

ReactDOM.render(<BrowserRouter>
		<Provider store={store}>
		  <Route component={App}/>
		  </Provider>
		</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

