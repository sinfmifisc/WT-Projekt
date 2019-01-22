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

    removeAnswer = (key) => {
        
        let newAnswers = this.state.answers.filter((answer) => key !== Number(answer.key))
            
        
        this.setState({answers: newAnswers});
        this.props.dispatch((removeAnswer(key)));
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

                <Button positive onClick={this.addAnswer} >Zusätzliche Antwortmöglichkeit</Button>
            
        
        </div>
    );
  }

}

export default connect() (Answers);