import React, { Component } from 'react';
import { Form, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {updateAnswer} from '../../../redux/actions/surveycreation'
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

    removeAnswer(id){
        const id_current="ganzeAntwort" + id;
        console.log(id_current);
        document.getElementById(id_current).remove();
    }

    render(){

        return <Form.Field>
            <div id={'ganzeAntwort' + this.state.id}>
        <input
            type='text'
            key={'Antwort' + this.state.id}
            id={'Antwort' + this.state.id}
            name={'Antwort' + this.state.id}
      q      value={this.state.content}
            onChange={this.handleChange}
            placeholder='Antwort verfassen'
           />
         <Icon
           className="trash alternate"
           onClick={()=>this.removeAnswer(this.state.id)}/>
    </div>
    </Form.Field>
    }
}

export default connect() (Answer);