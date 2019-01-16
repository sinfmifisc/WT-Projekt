import React from 'react';
import List from './List';


function ListItem(props) { 
    console.log(props.contacts);
  return (
    <ul>
      {props.contacts.map(c => <List color={c.color} name={c.name} />)}
     </ul> 
  ); 
} 

export default ListItem;