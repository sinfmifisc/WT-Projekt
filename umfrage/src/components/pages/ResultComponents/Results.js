import React, { Component } from 'react';
import {PieChart} from 'react-easy-chart';
import randomColor from 'randomcolor'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import TopHeader from '../../header/Header';
import ListItem from './ListItem';
import {authHeader} from '../../../App.js';
import '../../../App.css';




class results extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allresults: [],
            resultid: this.props.match.params.resultid,
            question: '',
            sum: 0,
            showToolTip: false
        }



    }

    componentDidMount(){

        axios.get('/loadsurvey/' + this.state.resultid, authHeader)
        .then((res) => {
            const allowed = !res.data.error;
            if(!allowed){
                this.props.history.push('/message/' + res.data.error);
            }
            else {
                this.setState({question: res.data[0].matter})
            }
            
            if(allowed){
                axios.get('/surveyevaluation/'+ this.state.resultid, authHeader)
                .then((res) => {
                    let array = [];
                    let sum = 0;
                    for(let i =0; i < res.data.length; i++){
                        sum = sum + res.data[i].count;
                        array.push({ title: res.data[i].content, value: res.data[i].count, color: randomColor() },);
                    };
                    this.setState({allresults: array, sum: sum});
                    })  
                }
            })

    }
   
    mouseOverHandler = (d, e) => {
      
        
        this.setState({
            
            showToolTip: true,
            value: d.value,
            title: d.data.title});
            
            
    }
    
    mouseOutHandler() {
        this.setState({showToolTip: false});
      }
    
  

    
    render() {
        

		return(
            
        <div className='semantic ui'>
        
        <TopHeader/>
        

            <h1> {this.state.question}</h1> 
            <ListItem contacts={this.state.allresults}/>
            <div id='pie'>
            {this.state.showToolTip && <h1> {(this.state.value / this.state.sum * 100).toFixed(2)} % stimmten für {this.state.title} is </h1> }
            <PieChart size={400}
                    data={this.state.allresults}
                    mouseOverHandler={this.mouseOverHandler.bind(this)}
                    mouseOutHandler={this.mouseOutHandler.bind(this)}
                   
            /> 
           
           </div>
           <Link className='ui primary button' to='/overlook'>Zurück zur übersicht</Link>
        </div>);
}
}
export default results;


