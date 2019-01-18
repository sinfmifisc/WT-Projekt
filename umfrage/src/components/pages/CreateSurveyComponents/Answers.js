import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import {connect} from 'react-redux'
import Answer from './Answer.js'
import {addAnswer} from '../../../redux/actions/surveycreation'
import {removeAnswer} from '../../../redux/actions/surveycreation'





class Answers extends Component {

    constructor(props) {
        super(props);
        
        this.state = {count: 0,
                    answers: [],
                    
                
            }
        
        this.removeAnswer = this.removeAnswer.bind(this);
      }



    addAnswer = () => {
        
        let currentCount = this.state.count;

        //Antwort im Store abspeichern
        this.props.dispatch(addAnswer(currentCount));

        this.setState({count : currentCount + 1},);        
        this.setState ({ answers: [...this.state.answers, 
            <Answer removeAnswer={this.removeAnswer} id={this.state.count} key={this.state.count}/>
        ]})
        
    }

    removeAnswer = (e) => {
        
        let newAnswers = this.state.answers.filter((answer) => {
            if(e.currentTarget.id !== answer.key)
                return answer;
        }) 
        
        this.setState({answers: newAnswers});
        this.props.dispatch((removeAnswer(e.currentTarget.id)));
    }


   componentDidMount(){
        if(this.state.count === 0){
        this.addAnswer();
    }
   }
    
	render() {
        
        
        return (

		<div id='Answers'>
                <h3>Antwortmöglichkeiten:</h3>        
                {this.state.answers}

                <Button primary onClick={this.addAnswer} >Zusätzliche Antwortmöglichkeit</Button>
            
        
        </div>
    );
  }

}

export default connect() (Answers);