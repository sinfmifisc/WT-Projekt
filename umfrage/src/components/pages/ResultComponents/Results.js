import React, { Component } from 'react';
import PieChart from 'react-svg-piechart';
import randomColor from 'randomcolor'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import TopHeader from '../../header/Header';
import ListItem from './ListItems';
import {authHeader} from '../../../App.js'
import '../../../App.css'



class results extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allresults: [],
            resultid: this.props.match.params.resultid,
            question: '',
        }

        axios.get('/surveyevaluation/'+ this.state.resultid, authHeader)
        .then((res) => {
            let array = [];
            for(let i =0; i < res.data.length; i++){
                array.push({ title: res.data[i].content, value: res.data[i].count, color: randomColor() },);
            };
            this.setState({allresults: array});
            
        })    
        
        axios.get('/loadsurvey/' + this.state.resultid, authHeader)
        .then((res) => {
            this.setState({question: res.data[0].matter})
        })
        
    }

    render() {
		return(
            
        <div className='semantic ui'>
        <TopHeader/>
            <h1> {this.state.question}</h1> 
            <ListItem contacts={this.state.allresults}/>
            <div id='pie'>
            <PieChart 
                   data={this.state.allresults}
            /> 
           <Link className='ui primary button' to='/overlook'>Zurück zur übersicht</Link>
           </div>
        </div>);
}
}
export default results;