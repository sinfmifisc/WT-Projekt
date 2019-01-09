import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Answers from './CreateSurveyComponents/Answers';
import Survey from './CreateSurveyComponents/Survey';
import AllowedUsers from './CreateSurveyComponents/AllowedUsers';
import SelectAllowedUsers from './CreateSurveyComponents/SelectAllowedUsers';
import TimeSelection from './CreateSurveyComponents/TimeSelection';
import axios from 'axios';
import './CreateSurvey.css'




class CreateSurvey extends Component {
	
	//redux thunks googlen

	constructor(props){
		super(props)

		
		this.state = {
			userList: [],
			allowedUserList: []
			
		}

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

	render() {
		
    return (
		<div>
		<Form >
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

export default CreateSurvey;

