import React, {Component} from 'react';
import icon from '../pages/title1.ico';
import { Link } from 'react-router-dom';
import '../../App.css';

class Header extends Component{ 

    

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


export default Header;