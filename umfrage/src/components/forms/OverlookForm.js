import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import '../../App.css';
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Table, Icon, Accordion, TableBody, Button, Label, ButtonGroup, Grid } from 'semantic-ui-react';
=======
import { Table, Icon, Accordion, TableBody, Button, Label, ButtonGroup, Grid, GridColumn } from 'semantic-ui-react';
>>>>>>> d871e9641547eb3f530fb5c2db636d6d450655ee
import { logout } from '../../actions/auth'
import axios from 'axios'

class OverlookForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
<<<<<<< HEAD
            opensurveys: [],
            myopensurveys: [],
            myclosedsurveys: [],
            closedsurveys: []
=======
            surveyList: [],
            mysurveys: [],
            closedsurveys: [],
            myclsurveys: []
>>>>>>> d871e9641547eb3f530fb5c2db636d6d450655ee
        }
        //First Table "All Surveys"
        axios.get('/loadopensurveys/' + localStorage.current_user + '/all')
            .then((res) => {
                let surveys = []; //every open survey gets in here

<<<<<<< HEAD
                for (let i = 0; i < res.data.length; i++) {
                    surveys[i] = res.data[i];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (surveys[i].answered === true) {
                        surveys[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        surveys[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }

                    surveys[i].id = "/answersurvey/" + res.data[i].id;
                }

                this.setState({
                    opensurveys: surveys
                })
            })

        //Second Table "My Surveys"
        axios.get('/loadopensurveys/' + localStorage.current_user + '/own')
            .then((mres) => {
                let mysurv = [];

                for (let i = 0; i < mres.data.lenght; i++) {
                    mysurv[i] = mres.data[i];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (mysurv[i].answered === true) {
                        mysurv[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        mysurv[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }

                    mysurv[i].id = "/answersurvey/" + mres.data[i].id;
                }

                
=======
        axios.get('/loadclosedsurveys/john/all')
            .then((resclosed) => {
                let listclosed = []; //all closed surveys
                let mylistclosed = []; //all closed surveys from curren user

                for (let index = 0; index < resclosed.data.length; index++) {
                    listclosed[index] = resclosed.data[index];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (listclosed[index].answered === true) {
                        listclosed[index].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        listclosed[index].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }

                    //checks if user created open survey
                    if (listclosed[index].creator === localStorage.current_user) {
                        mylistclosed.push(listclosed[index]);
                        mylistclosed[index].id = "/results/" + resclosed.data[index].id;
                    }
                    listclosed[index] = "/results/" + resclosed.data[index];
                }
                this.setState({
                    closedsurveys: listclosed,
                    myclsurveys: mylistclosed
                })
            })

        axios.get('/loadopensurveys/john/all')
            .then((res) => {
                let list = []; //every open survey gets in here
                let msurv = []; //surveys from user
                //let expiredsurveys = []; //expired surveys

>>>>>>> d871e9641547eb3f530fb5c2db636d6d450655ee

                this.setState({
                    myopensurveys: mysurv
                })
            })

        axios.get('/loadclosedsurveys/' + localStorage.current_user + '/own')
            .then((mclres) => {
                let myclsurv = [];

                for (let i = 0; i < mclres.data.lenght; i++) {
                    myclsurv[i] = mclres.data[i];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (myclsurv[i].answered === true) {
                        myclsurv[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        myclsurv[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }
<<<<<<< HEAD

                    myclsurv[i].id = "/answersurvey/" + mclres.data[i].id;
                }

                this.setState({
                    myclosedsurveys: myclsurv
                })
            })

        axios.get('/loadclosedsurveys/' + localStorage.current_user + '/all')
            .then((clres) => {
                let clsurv = [];

                for (let i = 0; i < clres.data.lenght; i++) {
                    clsurv[i] = clres.data[i];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (clsurv[i].answered === true) {
                        clsurv[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        clsurv[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }

                    clsurv[i].id = "/answersurvey/" + clres.data[i].id;
=======
                    //checks if user created open survey
                    if (list[i].creator === localStorage.current_user) {
                        msurv.push(list[i]);
                        msurv[i].id = "/answersurvey/" + res.data[i].id;
                    }
                    list[i].id = "/answersurvey/" + res.data[i].id;

>>>>>>> d871e9641547eb3f530fb5c2db636d6d450655ee
                }

                this.setState({
                    closedsurveys: clsurv
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
<<<<<<< HEAD
                <Grid key={2} columns='equal'>
                    <Grid.Column width="12">
                        <h1>PinPolls - Polls</h1>
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


=======
            <Grid key={2} columns='equal'>
            <Grid.Column width="12">
            <h1>PinPolls - Polls</h1>
            </Grid.Column>
             <Grid.Column floated="right">
             <ButtonGroup size="small">
                    <Button color="green" as={Link} to='/createsurvey'>
                        Neu Umfrage Erstellen
                    </Button>
                    <Button color="grey"  onClick={this.logout_handler} to="/">
                        Logout
                    </Button>
                </ButtonGroup>  
            </Grid.Column>   

            </Grid>
                    
                                    
>>>>>>> d871e9641547eb3f530fb5c2db636d6d450655ee

                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    ><Table color="yellow" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Aktuelle Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon circular inverted color='yellow' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <Table size="large" fixed width="100%">
                            <TableBody>
<<<<<<< HEAD
                                {this.state.opensurveys.map((surveys) => {
                                    return <Table.Row>
                                        <Table.Cell width="5"><i><b>{surveys.matter}</b></i></Table.Cell>
                                        <Table.Cell>{surveys.creator}</Table.Cell>
                                        <Table.Cell>{surveys.created_at}</Table.Cell>
                                        <Table.Cell>{surveys.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={surveys.id}>{surveys.answered}</a></Table.Cell>
                                        <Table.Cell textAlign="center">{surveys.count}</Table.Cell>
=======
                                {this.state.surveyList.map((list) => {
                                    return <Table.Row>
                                        <Table.Cell width="5"><i><b>{list.matter}</b></i></Table.Cell>
                                        <Table.Cell>{list.creator}</Table.Cell>
                                        <Table.Cell>{list.created_at}</Table.Cell>
                                        <Table.Cell>{list.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={list.id}>{list.answered}</a></Table.Cell>
                                        <Table.Cell>{list.count}</Table.Cell>
>>>>>>> d871e9641547eb3f530fb5c2db636d6d450655ee
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
                    ><Table color="purple" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Meine Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon circular inverted color='purple' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <Table size="large" fixed width="100%">
                            <TableBody>
<<<<<<< HEAD
                                {this.state.myopensurveys.map((mysurv) => {
                                    return <Table.Row>
                                        <Table.Cell width="5">{mysurv.matter}</Table.Cell>
                                        <Table.Cell>{mysurv.creator}</Table.Cell>
                                        <Table.Cell>{mysurv.created_at}</Table.Cell>
                                        <Table.Cell>{mysurv.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={mysurv.id}>{mysurv.answered}</a></Table.Cell>
                                        <Table.Cell textAlign="center">{mysurv.count}</Table.Cell>
=======
                                {this.state.mysurveys.map((msurv) => {
                                    return <Table.Row>
                                        <Table.Cell width="5">{msurv.matter}</Table.Cell>
                                        <Table.Cell>{msurv.creator}</Table.Cell>
                                        <Table.Cell>{msurv.created_at}</Table.Cell>
                                        <Table.Cell>{msurv.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={msurv.id}>{msurv.answered}<Label>Beanworten</Label></a></Table.Cell>
                                        <Table.Cell>{msurv.count}</Table.Cell>
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
                    ><Table color="violet" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Meine abgeschlossenen Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon circular inverted color='violet' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <Table size="large" fixed width="100%">
                            <TableBody>
                                {this.state.myclsurveys.map((mylistclosed) => {
                                    return <Table.Row>
                                        <Table.Cell width="5">{mylistclosed.matter}</Table.Cell>
                                        <Table.Cell>{mylistclosed.creator}</Table.Cell>
                                        <Table.Cell>{mylistclosed.created_at}</Table.Cell>
                                        <Table.Cell>{mylistclosed.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={mylistclosed.id}>{mylistclosed.answered}<Label>Beanworten</Label></a></Table.Cell>
                                        <Table.Cell>{mylistclosed.count}</Table.Cell>
>>>>>>> d871e9641547eb3f530fb5c2db636d6d450655ee
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
                    ><Table color="violet" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Meine abgeschlossenen Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon circular inverted color='violet' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Table size="large" fixed width="100%">
                            <TableBody>
                                {this.state.myclosedsurveys.map((myclsurv) => {
                                    return <Table.Row>
                                        <Table.Cell width="5">{myclsurv.matter}</Table.Cell>
                                        <Table.Cell>{myclsurv.creator}</Table.Cell>
                                        <Table.Cell>{myclsurv.created_at}</Table.Cell>
                                        <Table.Cell>{myclsurv.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={myclsurv.id}>{myclsurv.answered}<Label>Beanworten</Label></a></Table.Cell>
                                        <Table.Cell textAlign="center">{myclsurv.count}</Table.Cell>
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
                    ><Table color="teal" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left" width="5">Abgeschlossene Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon circular inverted color='teal' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell >Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <Table size="large" selectable fixed width="100%">
                            <TableBody>
<<<<<<< HEAD
                                {this.state.closedsurveys.map((closedsurveys) => {
                                    return <Table.Row>
                                        <Table.Cell width="5">{closedsurveys.matter}</Table.Cell>
                                        <Table.Cell>{closedsurveys.creator}</Table.Cell>
                                        <Table.Cell>{closedsurveys.created_at}</Table.Cell>
                                        <Table.Cell>{closedsurveys.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={closedsurveys.id}>{closedsurveys.answered}</a></Table.Cell>
                                        <Table.Cell textAlign="center">{closedsurveys.count}</Table.Cell>
=======
                                {this.state.closedsurveys.map((listclosed) => {
                                    return <Table.Row>
                                        <Table.Cell width="5">{listclosed.matter}</Table.Cell>
                                        <Table.Cell>{listclosed.creator}</Table.Cell>
                                        <Table.Cell>{listclosed.created_at}</Table.Cell>
                                        <Table.Cell>{listclosed.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={listclosed.id}>{listclosed.answered}</a></Table.Cell>
                                        <Table.Cell>{listclosed.count}</Table.Cell>
>>>>>>> d871e9641547eb3f530fb5c2db636d6d450655ee
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
OverlookForm.propTypes = {
    login: PropTypes.func.isRequired
};




export default connect(null, { logout })(OverlookForm);
