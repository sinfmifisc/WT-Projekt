import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "semantic-ui-css/semantic.min.css"
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import { userLoggedIn } from './actions/auth';




export const store = createStore(
		  rootReducer,
		  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.current_token){
	const user = { token: localStorage.current_token };
	store.dispatch(userLoggedIn(user));
}



		
		

ReactDOM.render(<BrowserRouter>
		<Provider store={store}>
		  <App />
		  </Provider>
		</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

