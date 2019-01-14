import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {updateAnswer} from '../../../actions/surveycreation.js'
import './Answers.css';




class Answer extends Component{

    constructor(props){
        super(props);

        this.state = {
            id: this.props.id,
            content: '',
        }
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        this.setState({...this.state, content: e.target.value});
    }


    componentDidUpdate(){
        this.props.dispatch(updateAnswer(this.state.id, this.state.content));
    }


    render(){

        return <Form.Field>
        <input
            type='text'
            key={'Antwort' + this.id}
            id={'Antwort' + this.id}
            name={'Antwort' + this.id}
            value={this.state.content}
            onChange={this.handleChange}
            placeholder='Antwort verfassen'
    />
    
    </Form.Field>
    }
}

export default connect() (Answer);