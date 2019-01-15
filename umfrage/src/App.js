import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CreateSurvey from './components/pages/CreateSurvey';
import SurveyCreated from './components/pages/SurveyCreated';
import Overlook from './components/pages/Overlook';
import UserRoute from './components/routes/UserRoute';
import Results from './components/pages/results';
import Answer from './components/pages/answer';
import PropTypes from "prop-types";
import AnswerSurvey from './components/pages/AnswerSurvey';


const App = ({ location} )=> (
	<div className="ui container">
	  <Route location={location} path="/" exact component={HomePage}/>
	  <Route location={location} path="/login" exact component={LoginPage}/>
	  <UserRoute location={location} path="/createsurvey" exact component={CreateSurvey}/>
	  <UserRoute location={location} path="/surveycreated" exact component={SurveyCreated}/>
	  <UserRoute location={location} path="/overlook" exact component={Overlook}/>
    <UserRoute location={location} path="/results" exact component={Results}/>
		<UserRoute location={location} path="/answer" exact component={Answer}/>
		<UserRoute location={location} path='/answersurvey/:surveyid' exact component={AnswerSurvey}/>
	 </div>
);


 App.propTypes = {
  location: PropTypes.shape({
	    pathname: PropTypes.string.isRequired
	  }).isRequired
	};


export default App;
