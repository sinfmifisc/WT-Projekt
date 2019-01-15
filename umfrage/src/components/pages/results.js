import React, { Component } from 'react';
import PieChart from "react-svg-piechart";
import randomColor from "randomcolor";  

let data = [];
let question= "Foo";

for(let i =0; i<10; i++){
    let title_var="Foo";
    let value_var=i+1;
    data.push({ title: title_var, value: value_var, color: randomColor() },);
};
console.log(data[0].title);

class results extends Component {
    
    render() {
		return(
        <div className="semantic ui">
            <h1>PinPoll - Answer</h1> 
            <div className="question">
            <h2>{question}</h2>
            </div>
            <PieChart
                   data={data}
               />                                                          
                  
        </div>);
}
}
export default results;
