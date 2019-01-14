import React, { Component } from 'react';
import { Table, Icon, Accordion, TableBody } from 'semantic-ui-react';


class Overlook extends Component {
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
            <div class="semantic ui">
                <h1>PinPoll - Polls</h1>
                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    ><Table color="orange" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Aktuelle Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon circular inverted color='orange' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell >Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right">Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <Table color="orange" size="large" inverted selectable fixed width="100%">
                            <TableBody>
                                <Table.Row >
                                    <Table.Cell textAlign="left">Was ist der Sinn des Lebens?</Table.Cell>
                                    <Table.Cell >Michael</Table.Cell>
                                    <Table.Cell >05.01.2019</Table.Cell>
                                    <Table.Cell >06.01.2019</Table.Cell>
                                    <Table.Cell>Jup</Table.Cell>
                                    <Table.Cell textAlign="right">42</Table.Cell>
                                </Table.Row>
                            </TableBody>
                        </Table>
                    </Accordion.Content>
                </Accordion>

                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    ><Table color="olive" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Meine Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon circular inverted color='olive' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell >Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right">Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex ===1}>
                        <Table color="olive" size="large" inverted selectable fixed width="100%">
                            <TableBody>
                                <Table.Row >
                                    <Table.Cell textAlign="left">Was ist der Sinn des Lebens?</Table.Cell>
                                    <Table.Cell >Michael</Table.Cell>
                                    <Table.Cell >05.01.2019</Table.Cell>
                                    <Table.Cell >06.01.2019</Table.Cell>
                                    <Table.Cell>Jup</Table.Cell>
                                    <Table.Cell textAlign="right">42</Table.Cell>
                                </Table.Row>
                            </TableBody>
                        </Table>
                    </Accordion.Content>
                </Accordion>

                <Accordion className="ui">
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    ><Table color="blue" styled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Abgelaufene Umfragen:</Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell ></Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right"><Icon circular inverted color='blue' name='angle double down' /></Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Frage</Table.HeaderCell>
                                    <Table.HeaderCell >Ersteller</Table.HeaderCell>
                                    <Table.HeaderCell >Erstelldatum</Table.HeaderCell>
                                    <Table.HeaderCell >Datum</Table.HeaderCell>
                                    <Table.HeaderCell >Beantwortet</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right">Teilnehnerzahlen</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Table color="blue" size="large" inverted selectable fixed width="100%">
                            <TableBody>
                                <Table.Row >
                                    <Table.Cell textAlign="left">Was ist der Sinn des Lebens?</Table.Cell>
                                    <Table.Cell >Michael</Table.Cell>
                                    <Table.Cell >05.01.2019</Table.Cell>
                                    <Table.Cell >06.01.2019</Table.Cell>
                                    <Table.Cell>Jup</Table.Cell>
                                    <Table.Cell textAlign="right">42</Table.Cell>
                                </Table.Row>
                            </TableBody>
                        </Table>
                    </Accordion.Content>
                </Accordion>

            </div>
        );
    }
}
export default Overlook;