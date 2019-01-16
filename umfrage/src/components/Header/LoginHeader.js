import React, {Component} from 'react';
import icon from '../pages/title1.ico';
import { Link } from 'react-router-dom';
import { deleteSurveyData} from '../../actions/surveycreation';
import {connect} from 'react-redux';
import '../../App.css';

class LoginHeader extends Component{ 

    constructor(props){
        super(props);

        this.props.dispatch(deleteSurveyData());
    }

    render(){
      return (          
     <div className='header'>
         <Link to='/overlook'>
          <span className='headerSchrift'>PinPoll </span>
          <img src={ icon } width='65' height='45' alt='logo' />
      
      </Link>
      </div>
      );
    }
}


export default connect() (LoginHeader);