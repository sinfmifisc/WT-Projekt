import React, {Component} from 'react';
import { Table, Icon, TableBody} from 'semantic-ui-react';
import axios from 'axios';
import {authHeader, backendUrl} from '../../../App.js'

class MyClosedSurveys extends Component {

    constructor(props) {
        super(props)

        this.state = {
            surveys: [],
            
        }


    }

        componentDidMount(){
            axios.get(backendUrl + '/loadclosedsurveys/' + localStorage.current_user + '/own', authHeader)
            .then((res) => {
                let surveys = []; //every open survey gets in here
                for (let i = 0; i < res.data.length; i++) {
                    surveys[i] = res.data[i];

                    //replace true/false in 'answered-bracket' with icon depending on value
                    if (surveys[i].answered === 'true') {
                        surveys[i].answered = <Icon className='check circle outline' color='green' size='big'></Icon>
                    } else {
                        surveys[i].answered = <Icon className='times circle outline' color='red' size='big'></Icon>
                    }
                    if (surveys[i].allowed_to_vote === 'false') {
                        surveys[i].answered = <Icon className='chess queen' color='yellow' size='big'></Icon>
                        
                    }

                    surveys[i].id = '/results/' + res.data[i].id;
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
                    {this.state.surveys.map((list, index) => {
                        return <Table.Row key={index}>
                            <Table.Cell width='5'><b><i>{list.matter}</i></b></Table.Cell>
                            <Table.Cell>{list.creator}</Table.Cell>
                            <Table.Cell>{list.created_at}</Table.Cell>
                            <Table.Cell>{list.end_at}</Table.Cell>
                            <Table.Cell textAlign='center' className='selectable'><a href={list.id}>{list.answered}</a></Table.Cell>
                            <Table.Cell textAlign='center'>{list.count}</Table.Cell>
                        </Table.Row>
                    })}
                </TableBody>
            </Table>
                    
        
        
        }
}


export default MyClosedSurveys;