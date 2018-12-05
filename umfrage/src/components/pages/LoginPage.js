import React, { Component } from 'react';
import LoginForm from  "../forms/LoginForm";

class HomePage extends Component {
  submit = data => {
	  console.log(data);
  };

  render() {
    return (
		<div>
		 <h1> Login </h1>
		 <LoginForm submit={this.submit} />
		</div>
    );
  }

}

export default HomePage;
