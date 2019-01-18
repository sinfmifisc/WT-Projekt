import React, {Component} from 'react';
import { Table, Icon, TableBody} from 'semantic-ui-react';
import axios from 'axios';
import {authHeader} from '../../../App.js'

class OpenSurveys extends Component {

    constructor(props) {
        super(props)

        this.state = {
            surveys: [],
            
        }




        }

        componentDidMount(){
            axios.get('/loadopensurveys/' + localStorage.current_user + '/all', authHeader)
            .then((res) => {
                let surveys = []; //every open survey gets in here
                for (let i = 0; i < res.data.length; i++) {
                    surveys[i] = res.data[i];
                    //replace true/false in 'answered-bracket' with icon depending on value
                    if (surveys[i].answered === 'true') {
                        surveys[i].answered = <Icon className='check circle outline' color='green' size='big'></Icon>
                        surveys[i].id = '/overlook'; //reload if clicked and user hase answered
                    } else {
                        surveys[i].answered = <Icon className='times circle outline' color='red' size='big'></Icon>
                        surveys[i].id = '/answersurvey/' + res.data[i].id; //link to the answer site
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
                            {this.state.surveys.map((list, index) => {
                                return <Table.Row key={index}>
                                    <Table.Cell width='5'><i><b>{list.matter}</b></i></Table.Cell>
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


export default OpenSurveys;