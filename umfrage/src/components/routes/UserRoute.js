import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

import jwt from 'jsonwebtoken'


const UserRouter = ({ isAuth, component: Component, ...rest }) => { return (
    <Route 
    {...rest} 
    render={props => 
        isAuth ? <Component {...props}/> :<Redirect to="/" />} 
    />
)};
UserRouter.propTypes ={
    component: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired
}

export const verifyToken = (token) => 
    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) {
            
            return false;
        }
        else{
            
            return true;
        }
    
    })


function mapsStateToProps(state) {
     
    return {
        isAuth: verifyToken(state.user.token)
    }
}

export default connect(mapsStateToProps) (UserRouter);
