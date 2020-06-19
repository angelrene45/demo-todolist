import React,{Fragment,Component} from 'react'
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

class CreateModal extends Component{

    state = {};

    constructor() {
        super();
        this.state = {
            showModal:false,
            validated:false,
            errors:{
                name:"Campo obligatorio",
            }
        }

        this.userInput = React.createRef();
        this.groupInput = React.createRef();

    }


    hideModal = () => {
        this.setState({
            showModal:false
        })
    }

    showModal = () => {
        this.setState({
            showModal:true
        });
        /* Muestra modal y hecmos foco en el input nombre */

        /* Activa evento cuando se presione trecla ESC */
        document.addEventListener("keydown", this.escFunction, false);
    }


    //Cuando el usuario presiona tecla esc se cierra el modal
    escFunction = (e) => {
        if(e.keyCode === 27) {
            this.hideModal();
        }
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
        // Lega aqui cuando pase las validaciones
        e.preventDefault();
        let {name,description,group,userAssign} = this.state;
        if(!group) group = this.groupInput.current.value; /* Validacion por si el evento onChange no trajo este camp */
        if(!userAssign) userAssign = this.userInput.current.value;

        const newActivity = {
            name:name,
            description:description,
            group:group,
            userAssign:userAssign,
            status:false,
            date:Date.now()
        }

        const {createActivity} = this.props;
        createActivity(newActivity);
    }

    handleChanged = ({target}) =>{
        const {name,value} = target;
        this.setState({
            [name]:value
        })
    }

    render() {

        const {validated,errors,showModal}  = this.state;

        return (
            <Fragment>
                <Modal show={showModal}>
                    <Modal.Header>Nueva Actividad</Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={this.handleSubmit} ref={ (ref) => { this.form = ref; }} >
                            <Row>
                                <Col>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control name="name" type="text" required onChange={this.handleChanged}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="formDesc">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control name="description" as="textarea" rows="2" required onChange={this.handleChanged}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="formGroup">
                                        <Form.Label>Grupo de trabajo</Form.Label>
                                        <Form.Control name="group" as="select" required onChange={this.handleChanged} ref={this.groupInput}>
                                            <option value="test">Testing</option>
                                            <option value="frontend">Frontend</option>
                                            <option value="backend">Backend</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="formUser">
                                        <Form.Label>Usuario asignado</Form.Label>
                                        <Form.Control name="userAssign" as="select" required onChange={this.handleChanged} ref={this.userInput}>
                                            <option value="54454654654">JUANN</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancelar</Button>
                        <Button onClick={ () => { this.form.dispatchEvent(new Event('submit')) } }>Agregar actividad</Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

export default CreateModal;
