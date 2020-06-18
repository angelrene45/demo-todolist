import React, {Fragment, Component} from 'react'
import '../../assets/css/login.css'
import {Form, Button, Container} from "react-bootstrap";
import logo from '../../assets/icons/login.svg';
import {Link} from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <Fragment>
                <div className="main">
                    <Container>
                        <div className="logo">
                            <img src={logo} alt=""/>
                            <h1> Inicio sesión </h1>
                        </div>

                        <div className="formLogin">
                            <Form>
                                <Form.Control type="email" placeholder="Correo"/>
                                <Form.Control type="password" placeholder="Contraseña"/>
                                <br/>
                                <Button variant="primary" type="submit">
                                    Iniciar sesión
                                </Button>
                            </Form>
                            <p><Link to="/register">Registrarse</Link></p>
                        </div>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default Login;
