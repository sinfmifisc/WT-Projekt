import React, { Component } from 'react';
import { Table, TableHeader } from 'semantic-ui-react'

class answers extends Component {

    render() {
        <div class="semantic ui">
            <h1>PinPoll - Results</h1>
            <Table color="orange">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Frage
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>
                            Antwort
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Anzahl
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Antwort1
                        </Table.Cell>
                        <Table.Cell>
                            Anzahl Antworten
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

        </div>
    }
}export default results;