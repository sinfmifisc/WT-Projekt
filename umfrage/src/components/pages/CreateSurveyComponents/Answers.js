import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import {connect} from 'react-redux'
import Answer from './Answer.js'
import {addAnswer} from '../../../actions/surveycreation'





class Answers extends Component {

    constructor(props) {
        super(props);
        
        this.state = {count: 0,
                    answers: [],
                    
                
            }
        
      }



    addAnswer = () => {
        console.log(this.state.count);
        let currentCount = this.state.count;

        //Antwort im Store abspeichern
        this.props.dispatch(addAnswer(currentCount));

        this.setState({count : currentCount + 1},);        
        this.setState ({ answers: [...this.state.answers, 
            <Answer id={this.state.count} key={this.state.count}/>
        ]})
        
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