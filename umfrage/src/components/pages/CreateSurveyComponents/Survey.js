import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Survey.css';
import { changeSurveyMatter } from '../../../actions/surveycreation.js';




   

    

class Survey extends Component{

    

    constructor(props){
        super(props);

        this.state ={
            matter: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }


    


    handleChange = e => {
        this.setState({...this.state, matter: e.target.value});
       
        
    }


    componentDidUpdate(){
        this.props.dispatch(changeSurveyMatter(this.state.matter));
    }
    
    

    render(){

        return <div id='surveyhead'>
            

            <input
            type='text'
            id={'Frage'}
            value={this.state.matter}
            onChange={this.handleChange}
            placeholder='Stelle hier deine Frage'
        />
    
    </div>
    }

    

}

export default connect() (Survey);