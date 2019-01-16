import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import '../../App.css';
import { Link } from "react-router-dom";
import { Table, Icon, Accordion, TableBody, Button, Label, ButtonGroup, Grid} from 'semantic-ui-react';
import { logout } from '../../actions/auth'
import axios from 'axios'

class OverlookForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            surveyList: [],
            mysurveys: [],
            closedsurveys: [],
            myclsurveys: []
        }

        axios.get('/loadclosedsurveys/john/all')
            .then((resclosed) => {
                let listclosed = []; //all closed surveys
                let mylistclosed = []; //all closed surveys from curren user

                for (let index = 0; index < resclosed.data.length; index++) {                                     
                    listclosed[index] = resclosed.data[index];

                    let startdate = new Date(listclosed[index].created_at);
                    startdate.split(/[- :]/);
                    listclosed[index].created_at = new Date(Date.UTC, startdate[0], startdate[1]-1, startdate[2])

                    let enddate = new Date(listclosed[index].end_at);
                    endate.split(/[- :]/);
                    listclosed[index].end_at = new Date(Date.UTC, enddate[0], enddate[1]-1, enddate[2])
                    
                    

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


                for (let i = 0; i < res.data.length; i++) {
                    list[i] = res.data[i];

                    //replace true/false in "answered-bracket" with icon depending on value
                    if (list[i].answered === true) {
                        list[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        list[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }
                    //checks if user created open survey
                    if (list[i].creator === localStorage.current_user) {
                        msurv.push(list[i]);
                        msurv[i].id = "/answersurvey/" + res.data[i].id;
                    }
                    list[i].id = "/answersurvey/" + res.data[i].id;

                }

                this.setState({
                    mysurveys: msurv,
                    surveyList: list
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
                                {this.state.surveyList.map((list) => {
                                    return <Table.Row>
                                        <Table.Cell width="5"><i><b>{list.matter}</b></i></Table.Cell>
                                        <Table.Cell>{list.creator}</Table.Cell>
                                        <Table.Cell>{list.created_at}</Table.Cell>
                                        <Table.Cell>{list.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={list.id}>{list.answered}</a></Table.Cell>
                                        <Table.Cell>{list.count}</Table.Cell>
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
                    <Accordion.Content active={activeIndex === 2}>
                        <Table size="large" selectable fixed width="100%">
                            <TableBody>
                                {this.state.closedsurveys.map((listclosed) => {
                                    return <Table.Row>
                                        <Table.Cell width="5">{listclosed.matter}</Table.Cell>
                                        <Table.Cell>{listclosed.creator}</Table.Cell>
                                        <Table.Cell>{listclosed.created_at}</Table.Cell>
                                        <Table.Cell>{listclosed.end_at}</Table.Cell>
                                        <Table.Cell textAlign="center" selectable><a href={listclosed.id}>{listclosed.answered}</a></Table.Cell>
                                        <Table.Cell>{listclosed.count}</Table.Cell>
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
