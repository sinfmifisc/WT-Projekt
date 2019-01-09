import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import Overlook from './components/pages/Overlook';
import UserRoute from './components/routes/UserRoute';



class App extends Component {
  render() {
    return (
     <div className="ui container">
	   <Route path="/" exact component={HomePage}/>
	   <Route path="/login" exact component={LoginPage}/>
     <UserRoute path="/overlook" exact component={Overlook}/>
	 </div>
    );
  }

}


export default App;
