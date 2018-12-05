import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
		<h1>UMFRAGE</h1>
		Username: <input type="text"></input> <br></br>
		Password: <input type="password"></input>
        </header>
      </div>
    );
  }
}

export default App;
