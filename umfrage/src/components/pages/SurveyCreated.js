import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Message } from 'semantic-ui-react';


class SurveyCreated extends Component{
    constructor(props){
        super(props)

        this.state = {
            text: '',
            error: true
            
        }


        switch(this.props.match.params.obj){
        case 'survey':
            console.log(this.props.match.params.obj);
            this.state.text = 'Umfrage wurde erfolgreich erstellt';
            this.state.error = true;
            break;
        case 'answer':
            this.state.text = 'Antwort erfolgreich abgesendet';
            this.state.error = true;
            break;
        case 'doubleanswer':
            this.state.text = 'Antworten fehlgeschlagen. Du hast diese Frage bereits beantwortet!';
            this.state.error = false;
            break;
        case 'surveyended':
            this.state.text = 'Antworten fehlgeschlagen. Diese Umfrage ist bereits zuende!';
            this.state.error = false;
            break;
        }

        
    }
    //doubleanswer
    

    render(){


        

        return <div>
            <Link to='/overlook'>Zurück zur Homepage</Link>
            {this.state.error && <Message positive>
                <Message.Header>{this.state.text}</Message.Header>
            </Message>}
            {!this.state.error && <Message negative>
                <Message.Header>{this.state.text}</Message.Header>
            </Message>}
        </div>
        
    }
}

export default SurveyCreated;