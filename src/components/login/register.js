import React, {Fragment, Component} from 'react'
import '../../assets/css/login.css'
import {Form, Button, Container} from "react-bootstrap";
import logo from '../../assets/icons/register.svg';
import {Link} from "react-router-dom";

class Register extends Component {
    render() {
        return (
            <Fragment>
                <div className="main">
                    <Container>
                        <div className="logo">
                            <img src={logo} alt=""/>
                            <h1> Registrarse </h1>
                        </div>

                        <div className="formLogin">
                            <Form>
                                <Form.Control name="name" type="name" placeholder="Nombre"/>
                                <Form.Control name="email" type="email" placeholder="Correo"/>
                                <Form.Control name="password" type="password" placeholder="Contraseña"/>
                                <br/>
                                <Button variant="primary" type="submit">
                                    Registrarse
                                </Button>
                            </Form>
                            <p><Link to="/login">Iniciar sesión</Link></p>
                        </div>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default Register;
