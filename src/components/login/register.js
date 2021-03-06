import React, {Fragment, Component} from 'react'
import '../../assets/css/login.css'
import {Form, Container, Alert} from "react-bootstrap";
import logo from '../../assets/icons/register.svg';
import {Link} from "react-router-dom";
import {registerUser} from "../../store/actions/authActions";
import {connect} from "react-redux";

const styleInput = {
    height:"60px"
}

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
        const {name,email,group,password} = this.state;
        const user = {
            name:name,
            group:group,
            email:email,
            password:password
        }

        const {registerUser} = this.props;
        registerUser(user);

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
        const {authState,registerError,history,userInfo} = this.props;

        if(authState.uid && userInfo.group) history.push('/home',{userData:userInfo});

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
                                <Form.Control style={styleInput} name="name" type="name" placeholder="Nombre" required onChange={this.handleChanged}/>
                                {this.displayInputError()}

                                <Form.Control style={styleInput}  name="group" as="select" required onChange={this.handleChanged} ref={this.groupInput}>
                                    <option value="">Seleccione grupo de trabajo</option>
                                    <option value="test">Testing</option>
                                    <option value="frontend">Frontend</option>
                                    <option value="backend">Backend</option>
                                </Form.Control>
                                {this.displayInputError()}

                                <Form.Control style={styleInput} name="email" type="email" placeholder="Correo" required onChange={this.handleChanged}/>
                                {this.displayInputError()}

                                <Form.Control style={styleInput} name="password" type="password" placeholder="Contraseña" required onChange={this.handleChanged}/>
                                {this.displayInputError()}
                                <br/>
                                <button className="btn-login" type="submit">
                                    Registrarse
                                </button>
                            </Form>
                            <p><Link to="/login">Iniciar sesión</Link></p>

                            { registerError &&
                            <Alert variant="danger" onClose={this.hideAlert}>
                                <Alert.Heading>Error en el registro</Alert.Heading>
                                <p>
                                    {registerError}
                                </p>
                            </Alert>
                            }
                        </div>
                    </Container>
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userInfo:state.firebase.profile,
        registerError:state.auth.registerError,
        authState:state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        registerUser: (user) => dispatch(registerUser(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);
