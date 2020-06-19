import React,{Fragment,Component} from 'react'
import {Button, Col, Form, ListGroup, Row} from "react-bootstrap";

class Activity extends Component{
    render() {

        const {showModal} = this.props;

        return (
            <Fragment>
                <ListGroup.Item>
                    <Row>
                        <Col sm={2} className="text-center"><Form.Check type="checkbox"/></Col>
                        <Col sm={3} className="text-left">Nombre de la actividad</Col>
                        <Col sm={2} className="text-center">Grupo de trabajo</Col>
                        <Col sm={3} className="text-center">Usuario asignado</Col>
                        <Col sm={2} className="text-right">
                            <Button variant="primary" onClick={showModal("edit")}>Editar</Button>
                            <Button variant="danger" onClick={showModal("delete")}>Eliminar</Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </Fragment>
        );
    }
}

export default Activity;
