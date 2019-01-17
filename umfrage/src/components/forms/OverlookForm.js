import React, { Component } from 'react';
import { connect } from "react-redux"
import '../../App.css';
import { Link } from "react-router-dom";
import { Table, Icon, Accordion, TableBody, Button, ButtonGroup, Grid } from 'semantic-ui-react';
import { logout } from '../../actions/auth'
import axios from 'axios'
import TopHeader from '../Header/LoginHeader';
class OverlookForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opensurveys: [],
            myopensurveys: [],
            myclosedsurveys: [],
            closedsurveys: []
        }
        //First Table "All Surveys"
        axios.get('/loadopensurveys/' + localStorage.current_user + '/all')
            .then((res) => {
                let surveys = []; //every open survey gets in here
                for (let i = 0; i < res.data.length; i++) {
                    surveys[i] = res.data[i];
                    //replace true/false in "answered-bracket" with icon depending on value
                    if (surveys[i].answered === "true") {
                        surveys[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                        surveys[i].id = "/overlook"; //reload if clicked and user hase answered
                    } else {
                        surveys[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                        surveys[i].id = "/answersurvey/" + res.data[i].id; //link to the answer site
                    }

                    
                }

                this.setState({
                    opensurveys: surveys
                })
            })

        //Second Table "My Surveys"
        axios.get('/loadopensurveys/' + localStorage.current_user + '/own')
            .then((res) => {
                let surveys = []; //every open survey gets in here
                for (let i = 0; i < res.data.length; i++) {
                    surveys[i] = res.data[i];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (surveys[i].answered === "true") {
                        surveys[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                        surveys[i].id = "/overlook";
                    } else {
                        surveys[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                        surveys[i].id = "/answersurvey/" + res.data[i].id;
                    }

                    //if the user is allowed to vote we create a link to the answer site
                    if (surveys[i].allowed_to_vote === "false") {
                        surveys[i].answered = <Icon className="chess queen" color="yellow" size="big"></Icon>
                        surveys[i].id = "/overlook";
                    }

                }

                this.setState({
                    myopensurveys: surveys
                })
            })

        //Third Table my closed surveys
        axios.get('/loadclosedsurveys/' + localStorage.current_user + '/own')
            .then((res) => {
                let surveys = []; //every open survey gets in here
                for (let i = 0; i < res.data.length; i++) {
                    surveys[i] = res.data[i];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (surveys[i].answered === "true") {
                        surveys[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        surveys[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }

                    surveys[i].id = "/results/" + res.data[i].id;
                }
                this.setState({
                    myclosedsurveys: surveys
                })
            })


        //fourth table all closed table
        axios.get('/loadclosedsurveys/' + localStorage.current_user + '/all')
            .then((res) => {
                let surveys = []; //every open survey gets in here
                for (let i = 0; i < res.data.length; i++) {
                    surveys[i] = res.data[i];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (surveys[i].answered === "true") {
                        surveys[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        surveys[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }

                    surveys[i].id = "/results/" + res.data[i].id;
                }
                this.setState({
                    closedsurveys: surveys
                })

            })
    }


    logout_handler = () => {
        this.props.logout();
    };

    state = { activeIndex: 0 }
    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    render() {
        const { activeIndex } = this.state
        return (

            <div className="semantic ui">

                <Grid key={2} columns='equal'>
                    <Grid.Column width="12">
                        <TopHeader/>
                    </Grid.Column>
                    <Grid.Column floated="right">
                        <ButtonGroup size="small">
                            <Button color="green" as={Link} to='/createsurvey'>
                                Neu Umfrage Erstellen
                    </Button>
                            <Button color="grey" onClick={this.logout_handler} to="/">
                                Logout
                    </Button>
                        </ButtonGroup>
                    </Grid.Column>

                </Grid>



                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    ><Table color="yellow" className="styled fixed">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="6">Aktuelle Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon className="circular inverted" color='yellow' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <Table size="large" className="fixed" width="100%">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <TableBody>
                                {this.state.opensurveys.map((list, index) => {
                                    return <Table.Row key={index}>
                                        <Table.Cell width="5"><i><b>{list.matter}</b></i></Table.Cell>
                                        <Table.Cell>{list.creator}</Table.Cell>
                                        <Table.Cell>{list.created_at}</Table.Cell>
                                        <Table.Cell>{list.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" className="selectable"><a href={list.id}>{list.answered}</a></Table.Cell>
                                        <Table.Cell textAlign="center">{list.count}</Table.Cell>
                                    </Table.Row>
                                })}
                            </TableBody>
                        </Table>
                    </Accordion.Content>
                </Accordion>


                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    ><Table color="purple" className="styled fixed">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Meine Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon className="circular inverted" color='purple' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <Table size="large" className="fixed" width="100%">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <TableBody>
                                {this.state.myopensurveys.map((mysurv, index) => {
                                    return <Table.Row key={index}>
                                        <Table.Cell width="5"><b><i>{mysurv.matter}</i></b></Table.Cell>
                                        <Table.Cell>{mysurv.creator}</Table.Cell>
                                        <Table.Cell>{mysurv.created_at}</Table.Cell>
                                        <Table.Cell>{mysurv.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" className="selectable"><a href={mysurv.id}>{mysurv.answered}</a></Table.Cell>
                                        <Table.Cell textAlign="center">{mysurv.count}</Table.Cell>
                                    </Table.Row>
                                })}
                            </TableBody>
                        </Table>
                    </Accordion.Content>
                </Accordion>

                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    ><Table color="violet" className="styled fixed">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Meine abgeschlossenen Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon className="circular inverted" color='violet' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Table size="large" className="fixed" width="100%">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <TableBody>
                                {this.state.myclosedsurveys.map((list, index) => {
                                    return <Table.Row key={index}>
                                        <Table.Cell width="5"><b><i>{list.matter}</i></b></Table.Cell>
                                        <Table.Cell>{list.creator}</Table.Cell>
                                        <Table.Cell>{list.created_at}</Table.Cell>
                                        <Table.Cell>{list.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" className="selectable"><a href={list.id}>{list.answered}</a></Table.Cell>
                                        <Table.Cell textAlign="center">{list.count}</Table.Cell>
                                    </Table.Row>
                                })}
                            </TableBody>
                        </Table>
                    </Accordion.Content>
                </Accordion>

                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.handleClick}
                    ><Table color="teal" className="styled fixed">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Abgeschlossene Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon className="circular inverted" color='teal' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <Table size="large" className="selectable fixed" width="100%">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <TableBody>
                                {this.state.closedsurveys.map((list, index) => {
                                    return <Table.Row key={index}>
                                        <Table.Cell width="5">{list.matter}</Table.Cell>
                                        <Table.Cell>{list.creator}</Table.Cell>
                                        <Table.Cell>{list.created_at}</Table.Cell>
                                        <Table.Cell>{list.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" className="selectable"><a href={list.id}>{list.answered}</a></Table.Cell>
                                        <Table.Cell textAlign="center">{list.count}</Table.Cell>
                                    </Table.Row>
                                })}
                            </TableBody>
                        </Table>
                    </Accordion.Content>
                </Accordion>
            </div>

        );
    }
}

export default connect(null, { logout })(OverlookForm);
