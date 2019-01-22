import React, { Component } from 'react';
import {Checkbox, List, ListItem, Button, Message}   from 'semantic-ui-react'; 
import axios from 'axios';
import TopHeader from '../header/Header';
import {authHeader, backendUrl} from '../../App.js';
import './AnswerSurvey.css';

class AnswerSurvey extends Component{

    constructor(props){
        super(props)

        this.state = {
            surveymatter: '',
            surveyid: this.props.match.params.surveyid,
            answers: [],
            currentChecked: null,
            error: ''
        }

        

        
        this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount(){
        axios.get(backendUrl + '/loadsurvey/' + this.state.surveyid, authHeader)
        .then((res) => {
            const allowed = !res.data.error;
            if(!allowed){
                this.props.history.push('/message/' + res.data.error);
            }
            else{

                this.setState({surveymatter: res.data[0].matter})

            }

            if(allowed){
                axios.get(backendUrl + '/loadanswers/'+ this.state.surveyid, authHeader)
                .then((res) => {
                    if(res.data.error){
                        this.props.history.push('/message/' + res.data.error);
                    }
                    else{
                        let array = [];
                        for(let i = 0; i < res.data.length; i++){
                        
                        array[i] = {id: res.data[i].id, content: res.data[i].content, checked:false}
                        }
                    this.setState({answers: array});    
                    }
        
        
                })
            }
            
        })
    }

    
    handleChange = (i, c) =>{
        if(this.state.currentChecked === i){
            this.setState({currentChecked: null})
        }
        else{
            this.setState({currentChecked: i})
        }
        this.setState(state => {
            const answers = state.answers.map((item) => {
              if (item.id === i) {
                return {id: item.id, content: c, checked: !item.checked };
              } else {
                return {id: item.id, content: item.content, checked: false};
              }
            });
      
            return {
              answers,
            };
          });
    }

    submitAnswer = () => {
        this.setState({error: ''})
        if(this.state.currentChecked !== null){
            

            let submitData = {surveyid: this.state.surveyid, answerid: this.state.currentChecked, username: localStorage.current_user}
        
        
            axios.post(backendUrl + '/submitanswer', submitData, authHeader)
            .then((response) =>{
                if(response.status === 201){
                    this.props.history.push('/message/answer');
                }
                else if(response.status === 200){
                    this.props.history.push('/message/' + response.data.error)
                }
            
            })
            .catch((err) => {
                this.props.history.push('/message/error');
            })
        }
        else{
            this.setState({error: 'Du musst eine Antwort ankreuzen!'});
        }
    }
    
    

    render(){

        
        return <div>
            <TopHeader/>
            {this.state.error.length > 0 && 
			<Message negative>
			<Message.Header>{this.state.error}</Message.Header>
          </Message>}
          <h2 id='answerSurveyHeader'>{this.state.surveymatter}</h2>
            <List selection  >
            
                {this.state.answers.map((answer) => <ListItem key={answer.id}>
                <Checkbox label={answer.content} key={answer.id}
                 onChange={() => this.handleChange(answer.id, answer.content)} checked={answer.checked}></Checkbox> 
                </ListItem> )}
            </List>
            <Button positive onClick={this.submitAnswer} id='submit_answer_button'>Antwort absenden </Button>
        </div>
        
    }
}

export default AnswerSurvey;