import React, { Component } from 'react';
import { Link } from "react-router-dom";
import icon from './title1.ico';
import '../../App.css';


class HomePage extends Component {
  render() {
    return (
		<div className="homepage">
		  <img src={icon} width="150" height="120" alt="logo" />
		  <h1 id="homepage_title">
		   PinPoll
		  </h1>
		  <Link id="homepage_link" to="/login"> Login </Link>
		</div>
    );
  }

}

export default HomePage;
