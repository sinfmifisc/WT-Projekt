import React, { Component } from 'react';
import {Checkbox, List, Header, ListItem, Button}   from 'semantic-ui-react'; 
import axios from 'axios';
import TopHeader from '../Header/LoginHeader';

class AnswerSurvey extends Component{

    constructor(props){
        super(props)

        this.state = {
            surveymatter: '',
            surveyid: this.props.match.params.surveyid,
            answers: [],
            currentChecked: null
            
        }

        axios.get('/loadanswers/'+ this.state.surveyid)
        .then((res) => {
            let array = [];
            for(let i = 0; i < res.data.length; i++){
                
                array[i] = {id: res.data[i].id, content: res.data[i].content, checked:false}
            }
            
            this.setState({answers: array});
            
        })

        
        
        axios.get('/loadsurvey/' + this.state.surveyid)
        .then((res) => {
            
            this.setState({surveymatter: res.data[0].matter})
        })
        

        this.handleChange = this.handleChange.bind(this);
        
    }

    
    handleChange = (i, c) =>{
        this.setState({currentChecked: i})
        this.setState(state => {
            const answers = state.answers.map((item, j) => {
              if (j === i) {
                return {id: i, content: c, checked: !item.checked };
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
        let submitData = {surveyid: this.state.surveyid, answerid: this.state.currentChecked, username: localStorage.current_user}
        
        
        axios.post('/submitanswer', submitData)
        .then((response) =>{
            if(response.status === 201){
                this.props.history.push('/surveycreated/answer');
            }
            else if(response.status === 200){
                this.props.history.push('/surveycreated/' + response.data.error)
            }
            
        })
        .catch((err) => {
            this.props.history.push('surveycreated/error');
        })
    }
    
    

    render(){

        
        return <div>
            <TopHeader/>

            <List >
            <Header>{this.state.surveymatter}</Header>
                {this.state.answers.map((answer, index) => <ListItem key={answer.id}>
                <Checkbox label={answer.content} key={answer.id}
                 onChange={() => this.handleChange(index, answer.content)} checked={answer.checked}></Checkbox> 
                </ListItem> )}
            </List>
            <Button primary onClick={this.submitAnswer} id='submit_answer_button'>Antwort absenden </Button>
        </div>
        
    }
}

export default AnswerSurvey;