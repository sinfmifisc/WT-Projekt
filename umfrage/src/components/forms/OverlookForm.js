import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Table } from 'semantic-ui-react';
import { connect } from "react-redux"
import '../../App.css';
import { logout } from '../../actions/auth'
//import * as actions from '../../actions/auth'
// <button className="ui primary big button" id="new_btn" onClick={() => newPoll()} to="/">Neue Umfrage erstellen</button>
//
class OverlookForm extends Component{
    logout_handler = () => {
        this.props.logout();
    };

   	render(){
		return (
            <div className="semantic ui">
                <h1>Homepage</h1>
                <button className="ui inverted secondary button" id="logout_btn" onClick={this.logout_handler} to="/">Logout</button>
                <Table color="orange" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Aktuelle Umfrage:</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Frage</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>asdf</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                </div>
                );
    }
}
OverlookForm.propTypes = {
    login: PropTypes.func.isRequired
  };


        
    
export default connect(null, { logout })(OverlookForm);
