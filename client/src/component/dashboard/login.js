import React from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

export default class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const formData = e.target;
        let email = formData.email.value;
        let password = formData.password.value;
        const request = { email, password };
        axios.post("http://localhost:5000/user/signin", request).then(res => {
            console.log(res);
            console.log(res.data);
        }).catch(error => console.log(error.response))
    }
    handleRegister = (e) => {
        console.log(e.target);
    }
    render() {
        return (
            <Container fluid className='signin'>
                <Form className='form-card' onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" />
                    </FormGroup>
                    <FormGroup>
                        <Button className='mr-2' color='success' type='submit'>Login</Button>
                        <Button color='primary' onClick={this.handleRegister}>Register</Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}