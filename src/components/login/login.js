import React, {Fragment, Component} from 'react'
import '../../assets/css/login.css'
import {Form, Container} from "react-bootstrap";
import logo from '../../assets/icons/login.svg';
import {Link} from "react-router-dom";

const styleInput = {
    height:"60px"
}

class Login extends Component {

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
        const {email,password} = this.state;
        const user = {
            email:email,
            password:password
        }

        console.log(user)
        const {history} = this.props;
        history.push('/home');
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
                            <h1> Inicio sesión </h1>
                        </div>

                        <div className="formLogin">
                            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                                <Form.Control style={styleInput} name="email" type="email" placeholder="Correo" required onChange={this.handleChanged}/>
                                {this.displayInputError()}

                                <Form.Control style={styleInput} name="password" type="password" placeholder="Contraseña" required onChange={this.handleChanged}/>
                                {this.displayInputError()}

                                <br/>
                                <button className="btn-login" type="submit">
                                    Iniciar sesión
                                </button>
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
