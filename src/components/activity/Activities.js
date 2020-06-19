import React,{Fragment,Component} from 'react'
import {Button, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import Activity from "./Activity";
import ModalActivity from "./ModalActivity";
import {createActivity, deleteActivity, editActivity} from "../../store/actions/activitiesActions";
import {connect} from "react-redux";


class Activities extends Component{

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }

    showModal = (option,activity={}) => () => {
        switch (option) {
            case "create":
                this.modalRef.current.showModal("create",{});
                break;
            case "edit":
                this.modalRef.current.showModal("edit",activity);
                break;
            default:
                break;
        }
    }

    addActivity = (newActivity) => {
        const {createActivity} = this.props;
        createActivity(newActivity);
        this.modalRef.current.hideModal();
    }

    removeActivity = (activity) => () => {
        const {deleteActivity} = this.props;
        deleteActivity(activity);
    }

    updateActivity = (activity) => {
        const {editActivity} = this.props;
        editActivity(activity);
        this.modalRef.current.hideModal();
    }

    render() {
        const {activities,usersGroup,user} = this.props;


        return (
            <Fragment>
                <ModalActivity createActivity={this.addActivity} editActivity={this.updateActivity} usersGroup={usersGroup} ref={this.modalRef} user={user} />
                <Container>
                    <Button onClick={this.showModal("create")} variant="success">Agregar</Button> <br/><br/>
                    <Row>
                        <Col sm={2} className="text-center">Estatus</Col>
                        <Col sm={3} className="text-left">Actividad</Col>
                        <Col sm={2} className="text-center">Grupo</Col>
                        <Col sm={3} className="text-center">Usuario Asignado</Col>
                        <Col sm={2} className="text-center">Opciones</Col>
                    </Row>
                    <ListGroup>
                        { activities && activities.map((activity,key) => {
                                return (
                                    <Activity key={key} showModal={this.showModal} activity={activity} removeActivity={this.removeActivity} usersGroup={usersGroup}/>
                                )
                            })
                        }
                    </ListGroup>
                </Container>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createActivity: (newActivity) => dispatch(createActivity(newActivity)),
        deleteActivity: (activity) => dispatch(deleteActivity(activity)),
        editActivity: (activity) => dispatch(editActivity(activity))
    }
}
export default connect(null,mapDispatchToProps)(Activities);
