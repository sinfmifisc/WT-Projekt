import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Message } from 'semantic-ui-react';


class SurveyCreated extends Component{
    constructor(props){
        super(props)

        this.state = {
            text: '',
            
        }

        if(this.props.match.params.obj === 'survey'){
            console.log(this.props.match.params.obj);
            this.state.text = 'Umfrage wurde erfolgreich erstellt'
        }
        else if(this.props.match.params.obj === 'answer'){
            this.state.text = 'Antwort erfolgreich abgesendet'
        }

        
    }

    

    render(){


        

        return <div>
            <Link to='/overlook'>Zurück zur Homepage</Link>
            <Message positive>
                <Message.Header>{this.state.text}</Message.Header>
            </Message>
        </div>
        
    }
}

export default SurveyCreated;