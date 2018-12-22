import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Answer from './Answer.js'







class Answers extends Component {

    constructor(props) {
        super(props);
        
        this.state = {count: 1,
                    answers: [<Answer id='0' key='0' />],
                    
                data: {
                    
                }
            };

            
      }


    onClick = () => {
        console.log(this.state.count);
        let a = this.state.count;
        this.setState({count : a + 1});
        
        this.setState ({ answers: [...this.state.answers, 
            <Answer id={this.state.count} key={this.state.count}/>
        ]})
        
    }


    
	render() {

        let a = 0;
        return (

		<div id='Answers'>
                <h3>Antwortmöglichkeiten:</h3>        
                {this.state.answers}

                <Button primary onClick={this.onClick} >Zusätzliche Antwortmöglichkeit</Button>
            
        
        </div>
    );
  }

}

export default Answers;