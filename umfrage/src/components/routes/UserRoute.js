import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const UserRouter = ({ isAuth, component: Component, ...rest }) => (
    <Route 
    {...rest} 
    render={props => 
        isAuth ? <Component {...props}/> :<Redirect to="/" />} 
    />
);
UserRouter.PropTypes ={
    component: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired
}
function mapsStateToProps(state) {
    return {
        isAuth: !!state.user.token
    }
}

export default connect(mapsStateToProps) (UserRouter);