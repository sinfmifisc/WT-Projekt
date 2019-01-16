import React, { Component } from 'react';
import { Form,} from 'semantic-ui-react'

class answer extends Component {

    render() {
		return(
        <div class="semantic ui">
            <h1>PinPoll - Answer</h1>
           
            <Form color="blue">
                <Form.Group>
                    <label> Frage </label>
                    <Form.Radio label="antwort1"></Form.Radio>
                </Form.Group>
                <Form.Button color="blue" inverted>
                    Submit
                </Form.Button>
            </Form>
        </div>);
}
}
export default answer;
