import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import '../../App.css';
import { Table, Icon, Accordion, TableBody, Tab } from 'semantic-ui-react';
import { logout } from '../../actions/auth'
import axios from 'axios'
//import * as actions from '../../actions/auth'
// <button className="ui primary big button" id="new_btn" onClick={() => newPoll()} to="/">Neue Umfrage erstellen</button>
//
class OverlookForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            surveyList: [],
        }

        axios.get('/loadopensurveys/john/all')
            .then((res) => {
                let list = [];
                for (let i = 0; i < res.data.length; i++) {
                    list[i] = res.data[i];
                    if (list[i].answered != true) {
                        list[i].answered = <Icon className="check circle outline" color="green" size="big"></Icon>
                    } else {
                        list[i].answered = <Icon className="times circle outline" color="red" size="big"></Icon>
                    }
                    
                }



                this.setState({

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
                                    <Table.HeaderCell textAlign="left">Aktuelle Umfragen:</Table.HeaderCell>
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
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    ><Table color="teal" styled fixed>
                         <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Aktuelle Umfragen:</Table.HeaderCell>
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
            </div>

        );
    }
}
OverlookForm.propTypes = {
    login: PropTypes.func.isRequired
};




export default connect(null, { logout })(OverlookForm);
