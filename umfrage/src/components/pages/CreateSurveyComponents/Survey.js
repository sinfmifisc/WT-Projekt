import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import './Survey.css'

class Survey extends Component{

    constructor(props){
        super(props);

        this.state ={
            mattter: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        this.setState({...this.state, matter: e.target.value});
    }

    render(){

        return <div id='surveyhead'>
            <h2>Was möchtest du fragen?</h2>
            <Button primary id='submit_survey_button'>Umfrage erstellen </Button>
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

export default Survey