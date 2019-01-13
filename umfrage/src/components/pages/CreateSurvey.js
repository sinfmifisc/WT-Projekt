import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Answers from './CreateSurveyComponents/Answers';
import Survey from './CreateSurveyComponents/Survey';
import AllowedUsers from './CreateSurveyComponents/AllowedUsers';
import SelectAllowedUsers from './CreateSurveyComponents/SelectAllowedUsers';
import TimeSelection from './CreateSurveyComponents/TimeSelection';
import axios from 'axios';
import {connect} from 'react-redux'
import {ALLOWED_USER} from '../../types.js'
import icon from './title1.ico'
import './CreateSurvey.css'
import {store} from '../../index.js'



class CreateSurvey extends Component {
	
	constructor(props){
		super(props)

		
		this.state = {
			userList: [],
			allowedUserList: [],
			test: []
		}


		//Alle User aus der Datenbank laden und im state abspeichern
		axios.get('/allUser')
		.then((res) => {

			let list = [];
			for(let a = 0; a < res.data.length; a++){
				list[a] = res.data[a].user_name;
			}
			this.setState({
				
				userList: list
			})
		})


		this.allowUser = this.allowUser.bind(this);
		this.removeUser = this.removeUser.bind(this);
		this.allowAllUser = this.allowAllUser.bind(this);
		this.removeAllUser = this.removeAllUser.bind(this);
	}


	allowAllUser = () => {
		this.setState({
			allowedUserList: [...this.state.allowedUserList.concat(this.state.userList)],
			userList: []
		})
	}


	allowUser = (name) => {
        this.setState({
            userList: this.state.userList.filter(el => el !== name),
            allowedUserList: [...this.state.allowedUserList.concat(name)]
            
		})
	
       
	}

	removeAllUser = () => {
		this.setState({
			userList: [...this.state.userList.concat(this.state.allowedUserList)],
			allowedUserList: []
		})
	}
	
	removeUser = (name) =>{
		this.setState({
            allowedUserList: this.state.allowedUserList.filter(el => el !== name),
            userList: [...this.state.userList.concat(name)]
            
        })
	}


	componentDidUpdate(){
		this.props.dispatch({type: ALLOWED_USER, user: this.state.allowedUserList});
		
	}
	



	//Im Store gespeicherte Daten validieren, dann an Backend-Server senden
	createSurvey = () =>{
		//Todo: Fehlermeldungen als Pop up oder ähnliches ausgeben
		let survey = store.getState();
		let dataValidated = true;
		
		if(survey.surveycreation.duration <= 0){
			console.log('Die Dauer muss positiv sein');
			dataValidated = false;
		}
		if(survey.surveycreation.surveymatter === ''){
			console.log('Die Umfrage darf nicht leer sein');
			dataValidated = false;
		}
		if(survey.surveycreation.allowedUser.length <= 1){
			console.log('Es müssen mindestens 2 User an der Umfrage teilnehmen dürfen')
			dataValidated = false;
		}
		survey.surveycreation.answers.forEach(answer => {
			if(answer.content === ''){
				console.log('Eine Antwort darf nicht leer sein');
			}
		})

		if(dataValidated){
			axios.post("/createsurvey", survey)
			.then(response => {console.log(response);
			
			})
			.catch((err) => console.log(err));
		}	
	}


	render() {	

    return (
		<div>
		<Form >
		<h2 id='surveyheadline'>Was möchtest du fragen? </h2>
            <Button primary onClick={this.createSurvey} id='submit_survey_button'>Umfrage erstellen </Button>
			<Survey />
			<div id='leftcontainer'>
				<TimeSelection/>
			</div>
			<Answers />
			<div id='rightcontainer'>
				<SelectAllowedUsers userList={this.state.userList} allowUser={this.allowUser} allowAllUser={this.allowAllUser}/>
				<AllowedUsers userList={this.state.allowedUserList} removeUser={this.removeUser} removeAllUser={this.removeAllUser}/>
			</div>
		</Form>
		
		</div>
    );
  }

}


export default connect() (CreateSurvey);

