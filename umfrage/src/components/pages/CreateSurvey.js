import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Answers from './CreateSurveyComponents/Answers';
import Survey from './CreateSurveyComponents/Survey';





class CreateSurvey extends Component {
	

	render() {
		
    return (
		<div>
		
		<Form >
			<Survey />
			<Answers />

			
		</Form>
		</div>
    );
  }

}

export default CreateSurvey;

