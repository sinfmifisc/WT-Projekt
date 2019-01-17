import React, { Component } from 'react';
import LoginForm from  '../forms/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { withRouter } from 'react-router';


class LoginPage extends Component {

  submit = data => {
  return this.props.login(data).then(() => this.props.history.push('/overlook'))
   
  
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

export default withRouter( connect( null, { login } )(LoginPage));
//import { compose } from 'redux'//geht nicht
//export default compose( withRouter, connect( null, { login } )(LoginPage));//so gehts leider nicht(seite wird nicht geladen)
//export default  connect( null, { login } )(LoginPage);