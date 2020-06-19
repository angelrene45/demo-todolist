import React,{Fragment,Component} from 'react'
import {Button, Col, Form, Modal, Row} from "react-bootstrap";


class ModalActivity extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            action: "", // Create or Edit
            currentActivity: {},
            showModal: false,
            validated: false,
            errors: {
                name: "Campo obligatorio",
            }
        }

        this.nameInput = React.createRef();
        this.descInput = React.createRef();
        this.userInput = React.createRef();
        this.groupInput = React.createRef();
    }


    hideModal = () => {
        this.setState({
            showModal: false
        })
    }

    showModal = (action, activity = {}) => {
        this.setState({
            showModal: true,
            action: action,
            currentActivity: activity
        });
        console.log(this.nameInput) // Marca null investigar porque!!! :(
        /* Activa evento cuando se presione trecla ESC */
        document.addEventListener("keydown", this.escFunction, false);
    }


    //Cuando el usuario presiona tecla esc se cierra el modal
    escFunction = (e) => {
        if (e.keyCode === 27) {
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
                validated: true
            });
            return;
        }
        // Llega aqui cuando pase las validaciones
        e.preventDefault();
        let {name, description, group, userAssign} = this.state;
        if (!group) group = this.groupInput.current.value; /* Validacion por si el evento onChange no trajo este camp */
        if (!userAssign) userAssign = this.userInput.current.value;
        if (!name) name = this.nameInput.current.value;
        if (!description) description = this.descInput.current.value;


        const newActivity = {
            name: name,
            description: description,
            group: group,
            userAssign: userAssign,
            status: false,
            date: Date.now()
        }

        const {action, currentActivity} = this.state;
        switch (action) {
            case "create":
                const {createActivity} = this.props;
                createActivity(newActivity);
                break;
            case "edit":
                const {editActivity} = this.props;
                editActivity({id: currentActivity.id, ...newActivity});
                break;
            default:
                break;
        }

    }

    handleChanged = ({target}) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    fillUsersSelected = () => {
        const {usersGroup} = this.props;

        if (usersGroup === undefined) return;

        return usersGroup.map((user, index) => {
            return <option key={index} value={user.id}>{user.name}</option>
        });

    }


    render() {

        const {validated,errors,showModal,currentActivity,action}  = this.state;



        let title = "";
        let botonText = "";

        switch (action) {
            case "create":
                title = "Nueva Actividad"
                botonText = "Agregar actividad"
                break;
            case "edit":
                title = "Edicion de Actividad"
                botonText = "Editar actividad"
                break;
            default:
                break;
        }

        return (
            <Fragment>
                <Modal show={showModal}>
                    <Modal.Header>{title}</Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={this.handleSubmit} ref={ (ref) => { this.form = ref; }} >
                            <Row>
                                <Col>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control name="name" type="text" required onChange={this.handleChanged} defaultValue={currentActivity.name} ref={this.nameInput}/>
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
                                        <Form.Control name="description" as="textarea" rows="2" required onChange={this.handleChanged} defaultValue={currentActivity.description} ref={this.descInput}/>
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
                                        <Form.Control name="group" as="select" required onChange={this.handleChanged} ref={this.groupInput} defaultValue={currentActivity.group}>
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
                                        <Form.Control name="userAssign" as="select" required onChange={this.handleChanged} ref={this.userInput} defaultValue={currentActivity.userAssign}>
                                            { this.fillUsersSelected() }
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
                        <Button onClick={ () => { this.form.dispatchEvent(new Event('submit')) } }>{botonText}</Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

export default (ModalActivity);
