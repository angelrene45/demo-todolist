import React,{Fragment,Component} from 'react'
import {Button, Container, ListGroup} from "react-bootstrap";
import Activity from "./Activity";
import CreateModal from "./CreateModal";


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

    render() {
        return (
            <Fragment>
                <CreateModal ref={this.modalRef}/>
                <Container>
                    <Button onClick={this.showModal("create")} variant="success">Agregar</Button><br/><br/>
                    <ListGroup>
                        <Activity showModal={this.showModal}/>
                    </ListGroup>
                </Container>
            </Fragment>
        );
    }
}

export default Activities;
