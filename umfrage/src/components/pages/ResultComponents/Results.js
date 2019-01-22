import React, { Component } from 'react';
import {PieChart} from 'react-easy-chart';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import TopHeader from '../../header/Header';
import ListItem from './ListItem';
import {authHeader, backendUrl} from '../../../App.js';
import '../../../App.css';
import './Results.css';
import {colors} from './Colors.js';



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

        axios.get(backendUrl + '/loadsurvey/' + this.state.resultid, authHeader)
        .then((res) => {
            const allowed = !res.data.error;
            if(!allowed){
                this.props.history.push('/message/' + res.data.error);
            }
            else {
                this.setState({question: res.data[0].matter})
            }
            
            if(allowed){
                axios.get(backendUrl + '/surveyevaluation/'+ this.state.resultid, authHeader)
                .then((res) => {
                    let array = [];
                    let sum = 0;
                    for(let i =0; i < res.data.length; i++){
                        sum = sum + res.data[i].count;
                        array.push({ title: res.data[i].content, value: res.data[i].count, color: colors[i % 10] },);
                    };
                    this.setState({allresults: array, sum: sum});
                    })  
                }
            })
        .catch((err) => this.props.history.push('/message/error'))

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
            {this.state.showToolTip && <div id='Hovertext' >
             {(this.state.value / this.state.sum * 100).toFixed(2)} % stimmten für: {this.state.title} </div> }
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


