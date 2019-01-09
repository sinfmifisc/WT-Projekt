import React, { Component } from 'react';
import LoginForm from  "../forms/LoginForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { withRouter } from "react-router";


class LoginPage extends Component {

	//hier findet eigentlich das rooten statt. => nur wenns geklappt hat
	//leider geht das noch nicht -> wenn es bald immer noch nicht geht hart einen href bei Link reinhauen
  submit = data => {
    this.props.login(data).then(() => { this.history.push("/")})
  };

  render() {
    return (
		<div>
		 <h1 className="login"> Login </h1>
		 <LoginForm submit={this.submit} />
		</div>
    );
  }
}
LoginPage.propTypes = {
  history: PropTypes.shape({
		  push: PropTypes.func.isRequired
		}).isRequired,
  login: PropTypes.func.isRequired
};

export default withRouter(connect(null, { login } )(LoginPage));
