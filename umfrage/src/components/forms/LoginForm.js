import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";

class LoginForm extends Component {
	state = {
		data: {
			username: '',
			email: '',
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
	   this.setState({ loading: true });
	   if(Object.keys(errors).length === 0){
		   this.props
			   .submit(this.state.data)
			   .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
	   }
	};

	validate = data => {
		const errors = {};
	    if (!data.username) errors.username = "Can't be blank";
	    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
	    if (!data.password) errors.password = "Can't be blank";
	    //if (!data.password).length <= 8) = "It is to short";
	    //if (!data.username).length <= 4) = "You need more then 4 charecters";
	    return errors;
	}

	render() {
	  const { data, errors, loading } = this.state;
      return (
		<Form onSubmit={this.onSubmit} loading={loading}>
		  { errors.global && (
			<Message negative>
			  <Message.Header>Something went wrong</Message.Header>
			  <p> {errors.global} </p>
		    </Message>
		  )}
		  <Form.Field error={!!errors.username}>
		    <label htmlFor="username">Username</label>
			<input
			  type="text"
			  id="username"
			  name="username"
			  placeholder="Username1"
			  value={data.username}
			  onChange={this.onChange}
		  />
		  {errors.username && <InlineError text={errors.username} />}
		  </Form.Field>
		  <Form.Field error={!!errors.email}>
		    <label htmlFor="email">Email</label>
			<input
			  type="email"
			  id="email"
			  name="email"
			  placeholder="example@examle.com"
			  value={data.email}
			  onChange={this.onChange}
		  />
		  {errors.email && <InlineError text={errors.email} />}
		  </Form.Field>
		  <Form.Field error={!!errors.password}>
		    <label htmlFor="password">Password</label>
			<input
			  type="password"
			  id="password"
			  name="password"
			  placeholder="Make it secure"
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
