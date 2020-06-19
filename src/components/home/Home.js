import React,{Fragment,Component} from 'react'
import Sidebar from "./Sidebar";
import '../../assets/css/home.css'
import Activities from "../activity/Activities";
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import {compose} from 'redux';

class Home extends Component{

    constructor(props) {
        super(props);
    }
    render() {
        const {activities} = this.props;

        return (
            <Fragment>
                <div className="wrapper">
                    <div className="sidebar">
                        <Sidebar/>
                    </div>
                    <div className="content">
                        <Activities activities={activities}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({firestore}) =>{
    if (Object.keys(firestore.ordered).length > 0){ // Comprobamos que ya se recibio informacion desde firestore
        return {
            activities: firestore.ordered.activities
        }
    }else{
        return {
            activities: []
        }
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection:'activities'
        }
    ])
)(Home);
