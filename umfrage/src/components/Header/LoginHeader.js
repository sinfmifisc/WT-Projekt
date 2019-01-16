import React, {Component} from 'react';
import icon from '../pages/title1.ico';
import { Link } from 'react-router-dom';
import '../../App.css';

class LoginHeader extends Component{ 

    render(){
      return (          
     <div className="semenic ui">
         <Link to="/overlook">
          <span className="header">PinPoll </span>
          <img src={ icon } width="55" height="35" alt="logo" />
      
      </Link>
      </div>
      );
    }
}


export default LoginHeader;