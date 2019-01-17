import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Table, Icon, Accordion, Button, ButtonGroup, Grid } from 'semantic-ui-react';
import { logout } from '../../redux/actions/auth'
import TopHeader from '../header/Header';
import OpenSurveys from '../pages/OverlookComponents/OpenSurveys';
import MyOpenSurveys from '../pages/OverlookComponents/MyOpenSurveys';
import MyClosedSurveys from '../pages/OverlookComponents/MyClosedSurveys';
import ClosedSurveys from '../pages/OverlookComponents/ClosedSurveys';

class OverlookForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
        }
        
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

            <div className='semantic ui'>

                <Grid key={2} columns='equal'>
                    <Grid.Column width='12'>
                        <TopHeader/>
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <ButtonGroup size='small'>
                            <Button color='green' as={Link} to='/createsurvey'>
                                Neu Umfrage Erstellen
                    </Button>
                            <Button color='grey' onClick={this.logout_handler} to='/'>
                                Logout
                    </Button>
                        </ButtonGroup>
                    </Grid.Column>

                </Grid>

               
                
                <Accordion className='ui'>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    ><Table color='yellow' className='styled fixed'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='left' width='6'>Aktuelle Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'><Icon className='circular inverted' color='yellow' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <OpenSurveys></OpenSurveys>
                    </Accordion.Content>
                </Accordion>


                <Accordion className='ui'>
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    ><Table color='purple' className='styled fixed'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='left' width='5'>Meine Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'><Icon className='circular inverted' color='purple' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <MyOpenSurveys></MyOpenSurveys>
                    </Accordion.Content>
                </Accordion>

                <Accordion className='ui'>
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    ><Table color='violet' className='styled fixed'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='left' width='5'>Meine abgeschlossenen Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'><Icon className='circular inverted' color='violet' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <MyClosedSurveys></MyClosedSurveys>
                    </Accordion.Content>
                </Accordion>

                <Accordion className='ui'>
                    <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.handleClick}
                    ><Table color='teal' className='styled fixed'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='left' width='5'>Abgeschlossene Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'><Icon className='circular inverted' color='teal' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <ClosedSurveys></ClosedSurveys>
                    </Accordion.Content>
                </Accordion>
            </div>

        );
    }
}

export default connect(null, { logout })(OverlookForm);
