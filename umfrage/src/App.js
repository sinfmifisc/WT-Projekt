import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CreateSurvey from './components/pages/CreateSurvey';
import MessagePage from './components/pages/MessagePage';
import Overlook from './components/pages/Overlook';
import UserRoute from './components/routes/UserRoute';
import Results from './components/pages/ResultComponents/Results';
import PropTypes from 'prop-types';
import AnswerSurvey from './components/pages/AnswerSurvey';



const App = ({ location} )=> (
	<div className='ui container'>
	  <Route location={location} path='/' exact component={HomePage}/>
	  <Route location={location} path='/login' exact component={LoginPage}/>
	  <UserRoute location={location} path='/createsurvey' exact component={CreateSurvey}/>
	  <UserRoute location={location} path='/message/:obj' exact component={MessagePage}/>
	  <UserRoute location={location} path='/overlook' exact component={Overlook}/>
    <UserRoute location={location} path='/results/:resultid' exact component={Results}/>
		<UserRoute location={location} path='/answersurvey/:surveyid' exact component={AnswerSurvey}/>
	 </div>
);


//Header für alle axios Aufrufe, zur Autorisierung beim Backend
export const authHeader = { 'headers': { 'Authorization': localStorage.current_token } };
//Für Docker IP= 192.168.99.100:8443
//Sonst localhost:8443
export const backendUrl = 'https://192.168.99.100:8443';

 App.propTypes = {
  location: PropTypes.shape({
	    pathname: PropTypes.string.isRequired
	  }).isRequired
	};


export default App;
