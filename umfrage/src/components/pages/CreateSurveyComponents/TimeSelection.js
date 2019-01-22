import React, { Component } from 'react';
import {Button, FormField} from 'semantic-ui-react';
import {connect} from 'react-redux'
import { changeDuration } from '../../../redux/actions/surveycreation';
import './TimeSelection.css';


class TimeSelection extends Component{

  constructor(props){
    super(props)

    this.state = {
       hours: 0,
       days: 0
    }

  }

  increaseHours = () => {
    this.setState({hours: this.state.hours + 1})
  }

  decreaseHours = () => {
    this.setState({hours: this.state.hours - 1})
  }

  increaseDays = () => {
    this.setState({days: this.state.days + 1})
  }

  decreaseDays = () => {
    this.setState({days: this.state.days - 1})
  }


  componentDidUpdate(){
    let hours = this.state.hours + this.state.days * 24;
    this.props.dispatch(changeDuration(hours));
  }

    render(){

        return <div id='timeselection'>
          <h3>Wie lange soll die Umfrage laufen?</h3>
            <FormField>
              <h4>Stunden:</h4>
              <input
                id='time'
                readOnly
                value={this.state.hours}
              />
            <Button negative id='dechours' onClick={this.decreaseHours}>-</Button>
            <Button positive id='inchours' onClick={this.increaseHours}>+</Button>
            


            </FormField>
            <FormField>
              <h4>Tage:</h4>
              <input
                id='days'
                readOnly
                value={this.state.days}
              />
            <Button negative id='decdays' onClick={this.decreaseDays}>-</Button>
            <Button positive id='incdays' onClick={this.increaseDays}>+</Button>
            


            </FormField>


            
      </div>
    }

}


export default connect() (TimeSelection);


