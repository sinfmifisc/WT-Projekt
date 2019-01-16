import React from 'react';
import OverlookForm from '../forms/OverlookForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Overlook  = ({ isConfirmed }) => (
    <div>{!isConfirmed && <OverlookForm />}</div>
);

Overlook.propTypes ={
   isConfirmed : PropTypes.bool.isRequired
};

function mapStateToProps(state){
    return {
        isConfirmed: !!state.user.confirmed
    }
}
        
    
export default connect(mapStateToProps)(Overlook);
