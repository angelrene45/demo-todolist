import React,{Fragment,Component} from 'react'
import {Button, Col, Form, ListGroup, Row} from "react-bootstrap";
import Moment from "react-moment";
import 'moment/locale/es';

class Activity extends Component{
    render() {

        const {showModal,activity,removeActivity} = this.props;


        return (
            <Fragment>
                <ListGroup.Item>
                    <Row>
                        <Col sm={2} className="text-center"><Form.Check type="checkbox" defaultChecked={activity.status}/></Col>
                        <Col sm={3} className="text-left">{activity.name}</Col>
                        <Col sm={2} className="text-center">{activity.group}</Col>
                        <Col sm={3} className="text-center">{activity.userAssign}</Col>
                        <Col sm={2} className="text-right">
                            <Button variant="primary" onClick={showModal("edit",activity)}>Editar</Button>
                            <Button variant="danger" onClick={removeActivity(activity)}>Eliminar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Moment interval={3000} fromNow>{activity.date}</Moment>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </Fragment>
        );
    }
}

export default Activity;
