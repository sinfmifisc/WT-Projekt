import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Message } from 'semantic-ui-react';


class SurveyCreated extends Component{

    render(){
        return <div>
            <Link to='/createsurvey'>Zurück zur Homepage</Link>
            <Message positive>
                <Message.Header>Umfrage erfolgreich erstellt!</Message.Header>
            </Message>
        </div>
        
    }
}

export default SurveyCreated;