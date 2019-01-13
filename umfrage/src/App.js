import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CreateSurvey from './components/pages/CreateSurvey';



class App extends Component {


  

  render() {
     

    return (
     <div className="ui container">
	   <Route path="/" exact component={HomePage}/>
	   <Route path="/login" exact component={LoginPage}/>
     <Route path="/createsurvey" exact component={CreateSurvey}/>
     
	 </div>
    );
  }

}


export default App;
