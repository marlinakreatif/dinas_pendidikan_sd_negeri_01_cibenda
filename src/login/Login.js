import React, { Component } from 'react';
import "./login.css";
import { Form, Col, Button } from "react-bootstrap";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false
        }
    }

    onSubmit = (event) => {

        let formData = event.target;
        if (!formData.checkValidity() === false) {
            event.stopPropagation();
        }
        
        this.setState({ validated: true })
        event.preventDefault();
    }

    render() {
        const { validated } = this.state
        return (
            <div className="login-body">
                <div className="bg-overlay-trs"></div>
                <div className="login-form">
                    <div className="logo">
                        <img src="/kbb.png" alt="Kabupaten Bandung Barat" />
                    </div>
                    <div className="title">
                        <span id="dinas">Dinas Pendidikan</span><br />
                        <span id="sekolah">{"SD Negeri 01 Cibenda".toLocaleUpperCase()}</span>
                    </div>
                    <hr />
                    <Form noValidate validated={validated} onSubmit={this.onSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="validateEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    required
                                />
                                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="validatePassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="Enter Password"
                                />
                                {/* <Form.Control.Feedback></Form.Control.Feedback> */}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button className="btn-bottom" type="submit" >Signin</Button>
                        </Form.Row>
                    </Form>
                </div>
            </div>
        )
    }
}
