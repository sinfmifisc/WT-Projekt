import React, { Component } from 'react';
import { Button, List, ListItem, Header } from 'semantic-ui-react';
import './SelectAllowedUsers.css';

class SelectAllowedUsers extends Component{

    

    allowUser(e) {
        this.props.allowUser(e);
    }

    allowAllUser(){
        this.props.allowAllUser();
    }

    render(){

        return <div id='selectusercontainer' >
            <Button positive onClick={() => {this.allowAllUser() }}>Alle hinzufügen</Button>
            
            <List id='selectuserlist' selection divided>
                <Header>Zur Auswahl User anklicken</Header>
                    {this.props.userList.map((user) => {
                        return <ListItem onClick={() => { this.allowUser(user)}} key={user}>{user}</ListItem>
                    })}
                
            </List>
        </div>
            
        
    }
}

export default SelectAllowedUsers;