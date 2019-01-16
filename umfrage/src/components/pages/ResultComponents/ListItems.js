import React from 'react';
import List from './List';


function ListItem(props) { 
  
  return (
    <ul>
      {props.contacts.map((c, index ) => {return <List key={index} color={c.color} name={c.title} />})}
     </ul> 
  ); 
} 

export default ListItem;