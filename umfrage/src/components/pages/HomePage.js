import React from 'react';
import { Link } from 'react-router-dom';
import icon from './title1.ico';
import '../../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {verifyToken} from '../routes/UserRoute'

const HomePage =({ isAuth }) => (
  
		  <div className="homepage">
		  <img src={icon} width="150" height="120" alt="logo" />
		  <h1 id="homepage_title">
		   PinPoll
		  </h1>
	    	{ isAuth ?  <Link className="link" id="overlook_link" to="/overlook"> Zu den Umfragen</Link> : <Link className ="link" id="homepage_link" to="/login"> Login </Link>}
		</div>
			
)
HomePage.protoTypes = {
	isAuth: PropTypes.bool.isRequired
}
function mapStateToProps(state){
	return {
		isAuth: verifyToken(state.user.token)
	};
}

export default connect(mapStateToProps) (HomePage);

			//{ isAuth ?  <Link class="link" id="overlook_link" to="/overlook"> Zu den Umfragen</Link> : <Link class ="link" id="homepage_link" to="/login"> Login </Link>}
