import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SURVEY } from '../../../types.js';
import './Survey.css';




   

    

class Survey extends Component{

    

    constructor(props){
        super(props);

        this.state ={
            mattter: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }


    a = () => {
        return {
            type: SURVEY,
            text: 'sdfadfa'
        }
    }

    //survey => dispatch(a);
    

    handleChange = e => {
        this.setState({...this.state, matter: e.target.value});
    }

    

    submitSurvey = () => {
        console.log('stteate');
    }


    

    render(){

        return <div id='surveyhead'>
            <h2 id='surveyheadline'>Was möchtest du fragen?</h2>
            <Button primary onClick={this.submitSurvey} id='submit_survey_button'>Umfrage erstellen </Button>
            <Form.Field>
            <input
            type='text'
            key={'Frage'}
            id={'Frage'}
            name={'Frage'}
            value={this.state.matter}
            onChange={this.handleChange}
            placeholder='Stelle hier deine Frage'
        />
    
    </Form.Field>
    
    </div>
    }

    

}

export default connect(null, {}) (Survey);