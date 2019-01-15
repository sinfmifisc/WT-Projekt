import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CreateSurvey from './components/pages/CreateSurvey';
import SurveyCreated from './components/pages/SurveyCreated';
import Overlook from './components/pages/Overlook';
import UserRoute from './components/routes/UserRoute';
import Results from './components/pages/results';
import Answer from './components/pages/answer';



class App extends Component {


  

  render() {
     

    return (
     <div className="ui container">
	     <Route path="/" exact component={HomePage}/>
	     <Route path="/login" exact component={LoginPage}/>
		 <UserRoute path="/createsurvey" exact component={CreateSurvey}/>
		 <UserRoute path="/surveycreated" exact component={SurveyCreated}/>
		 <UserRoute path="/results" exact component={Results}/>
		 <UserRoute path="/answer" exact component={Answer}/>
		 <UserRoute path="/overlook" exact component={Overlook}/>
	 </div>
    );
  }

}


export default App;
