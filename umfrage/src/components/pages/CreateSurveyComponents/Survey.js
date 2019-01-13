import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SURVEYMATTER } from '../../../types.js';
import './Survey.css';




   

    

class Survey extends Component{

    

    constructor(props){
        super(props);

        this.state ={
            matter: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }


    


    handleChange = e => {
        this.setState({...this.state, matter: e.target.value});
       
        
    }


    componentDidUpdate(){
        this.props.dispatch({type: SURVEYMATTER, text: this.state.matter});
    }
    
    

    render(){

        return <div id='surveyhead'>
            
            
            <input
            type='text'
            id={'Frage'}
            value={this.state.matter}
            onChange={this.handleChange}
            placeholder='Stelle hier deine Frage'
        />
    
    </div>
    }

    

}

export default connect() (Survey);