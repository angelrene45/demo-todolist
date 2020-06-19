import React,{Fragment,Component} from 'react'
import {Button, Container, ListGroup} from "react-bootstrap";
import Activity from "./Activity";
import CreateModal from "./CreateModal";
import {createActivity, deleteActivity} from "../../store/actions/activitiesActions";
import {connect} from "react-redux";


class Activities extends Component{

    modalRef = React.createRef();

    constructor(props) {
        super(props);
    }

    showModal = (option) => () => {
        switch (option) {
            case "create":
                this.modalRef.current.showModal();
                break;
            case "edit":

                break;

            case "delete":
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

    render() {
        const {activities} = this.props;

        return (
            <Fragment>
                <CreateModal ref={this.modalRef} createActivity={this.addActivity}/>
                <Container>
                    <Button onClick={this.showModal("create")} variant="success">Agregar</Button><br/><br/>
                    <ListGroup>
                        { activities && activities.map((activity,key) => {
                                return (
                                    <Activity key={key} showModal={this.showModal} activity={activity} removeActivity={this.removeActivity}/>
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
        deleteActivity: (activity) => dispatch(deleteActivity(activity))
    }
}
export default connect(null,mapDispatchToProps)(Activities);
