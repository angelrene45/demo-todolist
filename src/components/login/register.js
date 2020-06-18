import React, {Fragment, Component} from 'react'
import '../../assets/css/login.css'
import {Form, Button, Container} from "react-bootstrap";
import logo from '../../assets/icons/register.svg';
import {Link} from "react-router-dom";

class Register extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            validated:false,
            errors:{
                name:"Campo obligatorio",
            }
        }
    }

    handleChanged = ({target}) =>{
        const {name,value} = target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (e) => {
        // Comprueba que pase las validaciones HTML
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                validated:true
            });
            return;
        }

        // Llega aqui cuando pase las validaciones
        e.preventDefault();
        const {name,email,password} = this.state;
        const user = {
            name:name,
            email:email,
            password:password
        }
        
        console.log(user)

    }

    displayInputError = () => {
        const {errors} = this.state;

        return (
            <Form.Control.Feedback type="invalid">
                {errors.name}
            </Form.Control.Feedback>
        )
    }


    render() {

        const {validated}  = this.state;

        return (
            <Fragment>
                <div className="main">
                    <Container>
                        <div className="logo">
                            <img src={logo} alt=""/>
                            <h1> Registrarse </h1>
                        </div>

                        <div className="formLogin">
                            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                                <Form.Control name="name" type="name" placeholder="Nombre" required onChange={this.handleChanged}/>
                                {this.displayInputError()}

                                <Form.Control name="email" type="email" placeholder="Correo" required onChange={this.handleChanged}/>
                                {this.displayInputError()}

                                <Form.Control name="password" type="password" placeholder="Contraseña" required onChange={this.handleChanged}/>
                                {this.displayInputError()}
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
