import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import TopHeader from '../header/Header'

class MessagePage extends Component{
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
        case 'error':
            this.state.text = 'Es ist ein Fehler aufgetreten. Bitte versuche es später nochmal';
            this.state.error = false;
            break;
        default:
            this.state.text = 'Du solltest eigentlich nicht hier sein';
            this.state.error = false;
        }
    }
    
    

    render(){


        

        return <div>
            <TopHeader/>
            
            {this.state.error && <Message positive>
                <Message.Header>{this.state.text}</Message.Header>
            </Message>}
            {!this.state.error && <Message negative>
                <Message.Header>{this.state.text}</Message.Header>
            </Message>}
            <Link to='/overlook'>Zurück zur Homepage</Link>
        </div>
        
    }
}

export default MessagePage;