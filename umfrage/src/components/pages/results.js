import React, { Component } from 'react';
import PieChart from 'react-svg-piechart';
import randomColor from 'randomcolor';  

let data = [];
let question= "Foo";
const array = [
    {title: "Data 1", value: 100},
    {title: "Data 2", value: 60},
    {title: "Data 3", value: 30},
    {title: "Data 4", value: 20},
    {title: "Data 5", value: 10},
]

for(let i =0; i<array.length; i++){
    let title_var=array[i].title;
    let value_var=array[i].value;
    data.push({ title: title_var, value: value_var, color: randomColor() },);
};
console.log(data[0].title);

class results extends Component {
    
    render() {
		return(
        <div className="semantic ui">
            <h1>PinPoll Ergebnis</h1> 
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
