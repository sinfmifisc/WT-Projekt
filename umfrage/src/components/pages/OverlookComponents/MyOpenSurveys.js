import React, {Component} from 'react';
import { Table, Icon, TableBody} from 'semantic-ui-react';
import axios from 'axios';
import {authHeader} from '../../../App.js'

class MyOpenSurveys extends Component {

    constructor(props) {
        super(props)

        this.state = {
            surveys: [],
            
        }

    }
        
        componentDidMount(){
            axios.get('https://localhost:8443/loadopensurveys/' + localStorage.current_user + '/own', authHeader)
            .then((res) => {
                let surveys = []; //every open survey gets in here
                for (let i = 0; i < res.data.length; i++) {
                    surveys[i] = res.data[i];

                    //replace true/false in 'answered-bracket' with icon depending on value
                    if (surveys[i].answered === 'true') {
                        surveys[i].answered = <Icon className='check circle outline' color='green' size='big'></Icon>
                        surveys[i].id = '/overlook';
                    } else {
                        surveys[i].answered = <Icon className='times circle outline' color='red' size='big'></Icon>
                        surveys[i].id = '/answersurvey/' + res.data[i].id;
                    }

                    //if the user is allowed to vote we create a link to the answer site
                    if (surveys[i].allowed_to_vote === 'false') {
                        surveys[i].answered = <Icon className='chess queen' color='yellow' size='big'></Icon>
                        surveys[i].id = '/overlook';
                    }

                }
                
                this.setState({surveys: surveys});
                    
                
            })
        }
        

        render(){


            return <Table size='large' className='fixed' width='100%'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='left' width='5'>Frage</Table.HeaderCell>
                        <Table.HeaderCell >Ersteller</Table.HeaderCell>
                        <Table.HeaderCell >Erstellt am</Table.HeaderCell>
                        <Table.HeaderCell >Endet am</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Beantwortet</Table.HeaderCell>
                        <Table.HeaderCell >Teilnehmer</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <TableBody>
                    {this.state.surveys.map((mysurv, index) => {
                        return <Table.Row key={index}>
                            <Table.Cell width='5'><b><i>{mysurv.matter}</i></b></Table.Cell>
                            <Table.Cell>{mysurv.creator}</Table.Cell>
                            <Table.Cell>{mysurv.created_at}</Table.Cell>
                            <Table.Cell>{mysurv.end_at}</Table.Cell>
                            <Table.Cell textAlign='center' className='selectable'><a href={mysurv.id}>{mysurv.answered}</a></Table.Cell>
                            <Table.Cell textAlign='center'>{mysurv.count}</Table.Cell>
                        </Table.Row>
                    })}
                </TableBody>
            </Table>
                    
        
        
        }
}


export default MyOpenSurveys;