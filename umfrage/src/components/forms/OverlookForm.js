import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import '../../App.css';
import { Link } from "react-router-dom";
import { Table, Icon, Accordion, TableBody} from 'semantic-ui-react';
import { logout } from '../../actions/auth'
import axios from 'axios'

class OverlookForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            surveyList: [],
            mysurveys: [],
            closedsurveys: []
        }

axios.get('/loadclosedsurveys/john/all')
.then((resclosed) =>{
    let listcloesd = [];

    for (let index = 0; index < resclosed.data.length; index++) {
        listcloesd[index] = resclosed.data[index];

        //replace true/false in "answered-bracket" with icon depending on value

        if (listclosed[index].answered === true) {
            listcloesd[index].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
        } else {
            listcloesd[index].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
        }
    }
    this.setState({
        closedsurveys: listcloesd
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
                    if(list[i].creator === "John"){
                        msurv.push(list[i]);
                    }
                                       
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
                <h1>PinPoll - Polls</h1>
                <button className="ui inverted secondary button" id="logout_btn" onClick={this.logout_handler} to="/">Logout</button>
                <Link className='ui primary button' to='/createsurvey'>Neue Umfrage erstellen</Link>
                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    ><Table color="yellow" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Aktuelle Umfragen:</Table.HeaderCell>
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
                        <Table size="large" selectable fixed width="100%">
                            <TableBody>
                                    {this.state.surveyList.map((list ) => {
                                        return <Table.Row>
                                                    <Table.Cell>{list.matter}</Table.Cell>
                                                    <Table.Cell>{list.creator}</Table.Cell>
                                                    <Table.Cell>{list.created_at}</Table.Cell>
                                                    <Table.Cell>{list.end_at}</Table.Cell>
                                                    <Table.Cell textAlign="center">{list.answered}</Table.Cell>
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
                                    <Table.HeaderCell textAlign="left">Meine Umfragen:</Table.HeaderCell>
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
                        <Table size="large" selectable fixed width="100%">
                            <TableBody>
                                    {this.state.mysurveys.map((msurv) => {
                                        return <Table.Row>
                                                    <Table.Cell>{msurv.matter}</Table.Cell>
                                                    <Table.Cell>{msurv.creator}</Table.Cell>
                                                    <Table.Cell>{msurv.created_at}</Table.Cell>
                                                    <Table.Cell>{msurv.end_at}</Table.Cell>
                                                    <Table.Cell textAlign="center">{msurv.answered}</Table.Cell>
                                                    <Table.Cell>{msurv.count}</Table.Cell>
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
                                    <Table.HeaderCell textAlign="left">Beendete Umfragen:</Table.HeaderCell>
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
                                    {this.state.closedsurveys.map((listcloesd ) => {
                                        return <Table.Row>
                                                    <Table.Cell>{listcloesd.matter}</Table.Cell>
                                                    <Table.Cell>{listcloesd.creator}</Table.Cell>
                                                    <Table.Cell>{listcloesd.created_at}</Table.Cell>
                                                    <Table.Cell>{listcloesd.end_at}</Table.Cell>
                                                    <Table.Cell textAlign="center">{listcloesd.answered}</Table.Cell>
                                                    <Table.Cell>{listcloesd.count}</Table.Cell>
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
