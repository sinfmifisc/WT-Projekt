import React, { Component } from 'react';
import PieChart from 'react-svg-piechart';
import randomColor from 'randomcolor'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import TopHeader from '../Header/LoginHeader';

class results extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allresults: [],
            resultid: this.props.match.params.resultid,
            question: '',
        }

        axios.get('/surveyevaluation/'+ this.state.resultid)
        .then((res) => {
            let array = [];
            for(let i =0; i < res.data.length; i++){
                array.push({ title: res.data[i].content, value: res.data[i].count, color: randomColor() },);
            };
            this.setState({allresults: array});
            console.log(res.data.length);
            console.log(this.state.allresults)  
        })    
        
        axios.get('/loadsurvey/' + this.state.resultid)
        .then((res) => {
            this.setState({question: res.data[0].matter})
        })
        
    }
    
    render() {
		return(
            
        <div className="semantic ui">
        <TopHeader/>
            <h1> {this.state.question}</h1> 
            <Link className='ui primary button' to='/overlook'>Zurück zur übersicht</Link>
            <div className="question">
            </div>
            <PieChart
                   data={this.state.allresults}
               />                                                          
                  
        </div>);
}
}
export default results;
