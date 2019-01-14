import React, { Component } from 'react';
import { Button, List, ListItem, Header } from 'semantic-ui-react';
import './AllowedUsers.css';

class AllowedUsers extends Component{

    
    removeUser(e){
        this.props.removeUser(e);
    }

    removeAllUser(){
        this.props.removeAllUser();
    }

    render(){

        return <div id='allowedusercontainer'>
            <Button onClick={() => {this.removeAllUser()}}>Liste leeren</Button>
            <List id='alloweduserlist' selection divided>
                <Header>Teilnehmen dürfen:</Header>
                {this.props.userList.map((user) => {
                        return <ListItem onClick={() => { this.removeUser(user)}} key={user}>{user}</ListItem>
                    })}
                
            </List>
            
        </div>
            
        
    }
}

export default AllowedUsers;