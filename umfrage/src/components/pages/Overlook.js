import React, { Component } from 'react';
import OverlookForm from '../forms/OverlookForm';
import PropTypes from "prop-types";
import { Table, Button, Icon, Menu, Accordion, AccordionTitle } from 'semantic-ui-react';


class Overlook extends Component {

    render() {
        return (
            <div class="semantic ui">
                <h1>Homepage</h1>
                <Table color="orange" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Aktuelle Umfrage:</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell textAlign="right"><Icon circular inverted color='red' name='angle double down' /></Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Frage</Table.HeaderCell>
                            <Table.HeaderCell>Ersteller</Table.HeaderCell>
                            <Table.HeaderCell>Erstelldatum</Table.HeaderCell>
                            <Table.HeaderCell>Datum</Table.HeaderCell>
                            <Table.HeaderCell>Beantwortet</Table.HeaderCell>
                            <Table.HeaderCell>Teilnehnerzahlen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Table color="olive" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Meine Umfragen:</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell textAlign="right"><Icon circular inverted color='olive' name='angle double down' /></Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Frage</Table.HeaderCell>
                            <Table.HeaderCell>Ersteller</Table.HeaderCell>
                            <Table.HeaderCell>Erstelldatum</Table.HeaderCell>
                            <Table.HeaderCell>Datum</Table.HeaderCell>
                            <Table.HeaderCell>Beantwortet</Table.HeaderCell>
                            <Table.HeaderCell>Teilnehnerzahlen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        <Table.Row>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                            <Table.Cell>asdf</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                    <Table color="blue" selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Abgeschlossene Umfragen:</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell textAlign="right"><Icon circular inverted color='blue' name='angle double down' /></Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell>Frage</Table.HeaderCell>
                                <Table.HeaderCell>Ersteller</Table.HeaderCell>
                                <Table.HeaderCell>Erstelldatum</Table.HeaderCell>
                                <Table.HeaderCell>Datum</Table.HeaderCell>
                                <Table.HeaderCell>Beantwortet</Table.HeaderCell>
                                <Table.HeaderCell>Teilnehnerzahlen</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body >
                            <Table.Row>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                                <Table.Cell>asdf</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                );
            }
        }
export default Overlook;