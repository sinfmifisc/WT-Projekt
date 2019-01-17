import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';


class LoginForm extends Component {
	state = {
		data: {
			username: '',
			password: ''
		},
	    loading: false,
	    errors: {},
	}

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value}
	});

	onSubmit = () => {
	   const errors = this.validate(this.state.data);
	   this.setState({ errors });
	   if(Object.keys(errors).length === 0){ 
			this.setState({ loading: true });
		  this.props
				 .submit(this.state.data)
			   .catch(err =>{
						 this.setState({ errors: err.response.data.errors, loading: false })
				 });
				
	   }
	};

	validate = data => {
		const errors = {};
	    if (!data.username) errors.username = "Bitte füllen";
	    if (!data.password) errors.password = "Bitte füllen";
	    return errors;
	}

	render() {
	  const { data, errors, loading } = this.state;
      return (
		<Form onSubmit={this.onSubmit} loading={loading}>
		  { errors.global && (
			<Message negative>
			  <Message.Header>Leider ist etwas schief gelaufen</Message.Header>
			  <p> {errors.global} </p>
		    </Message>
		  )}
		  <Form.Field error={!!errors.username}>
		    <label htmlFor="username">Benutzername</label>
			<input
			  type="text"
			  id="username"
			  name="username"
			  placeholder="Username"
			  value={data.username}
			  onChange={this.onChange}
		  />
		  {errors.username && <InlineError text={errors.username} />}
		  </Form.Field>
		  <Form.Field error={!!errors.password}>
		    <label htmlFor="password">Passwort</label>
			<input
			  type="password"
			  id="password"
			  name="password"
			  placeholder="Passwort"
			  value={data.password}
			  onChange={this.onChange}
		  />
		  {errors.password && <InlineError text={errors.password} />}
		  </Form.Field>
		  <Button primary>Login</Button>
		</Form>
    );
  }
}

LoginForm.propTypes = {
	  submit: PropTypes.func.isRequired
};

export default LoginForm;
