import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Answers from './CreateSurveyComponents/Answers';
import Survey from './CreateSurveyComponents/Survey';
import AllowedUsers from './CreateSurveyComponents/AllowedUsers';
import SelectAllowedUsers from './CreateSurveyComponents/SelectAllowedUsers';
import TimeSelection from './CreateSurveyComponents/TimeSelection';
import axios from 'axios';
import {connect} from 'react-redux'
import TopHeader from '../Header/LoginHeader';
import './CreateSurvey.css'
import {store} from '../../index.js'
import { deleteSurveyData, updateAllowedUser } from '../../actions/surveycreation';



class CreateSurvey extends Component {
	
	constructor(props){
		super(props)

		
		this.state = {
			userList: [],
			allowedUserList: [],
			errors: []
		}


		//Alle User aus der Datenbank laden und im state abspeichern
		const header = 'Authorization: Bearer ' + localStorage.current_token;
		axios.get('/allUser', { headers: {header}})
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
		this.props.dispatch(updateAllowedUser(this.state.allowedUserList));
		
	}
	



	//Im Store gespeicherte Daten validieren, dann an Backend-Server senden
	createSurvey = () =>{
		
		this.setState({errors: []});
		

		let survey = store.getState();
		let dataValidated = true;
		let tmpErrors = [];
		let answerIsEmpty = false;
		
		if(survey.surveycreation.duration <= 0){
			
			tmpErrors = tmpErrors.concat('Die Umfrage muss mindestens eine Stunde laufen');
			dataValidated = false;
		}
		if(survey.surveycreation.surveymatter === ''){
			
			tmpErrors = tmpErrors.concat('Die Umfrage darf nicht leer sein');
			dataValidated = false;
		}
		if(survey.surveycreation.allowedUser.length <= 1){
			
			tmpErrors = tmpErrors.concat('Es müssen mindestens zwei User an der Umfrage teilnehmen dürfen');
			dataValidated = false;
		}
		survey.surveycreation.answers.forEach(answer => {
			if(answer.content === ''){
				
				
				answerIsEmpty = true;
				dataValidated = false;
				
			}
		})

		if(answerIsEmpty){
			tmpErrors = tmpErrors.concat('Eine Antwort darf nicht leer sein');
		}

		//Fehler im State speichern und ausgeben
		this.setState({errors: tmpErrors})
		let submitdata = {surveydata:survey, userinfo: localStorage.current_user}
		

		//Daten sind alle gültig eingegeben -> Post der Daten an Backend
		if(dataValidated){
			axios.post("/createsurvey", submitdata)
			.then(response => {
				if(response.status === 201){
					console.log(response.status);
					this.props.dispatch(deleteSurveyData());
					this.props.history.push('/SurveyCreated/survey');
					
				}
			})
			.catch((err) => this.props.history.push('/surveycreated/error'));
		}	
	}




	render() {	

    return (
		<div>
			<TopHeader/>
		<Form >
			{this.state.errors.length !== 0 && 
			<Message negative>
			<Message.Header>Fehlerhafte Eingaben!</Message.Header>
			<ul> {this.state.errors.map((error) => {
			return <li key={error}>{error}</li> })} </ul> 
		  </Message>}
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

