import React,{Fragment,Component} from 'react'
import Sidebar from "./Sidebar";
import '../../assets/css/home.css'
import Activities from "../activity/Activities";
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import {compose} from 'redux';

class Home extends Component{

    render() {
        const {activities,authState,history,profile} = this.props;

        if(!authState.uid) history.push('/login');

        return (
            <Fragment>
                <div className="wrapper">
                    <div className="sidebar">
                        <Sidebar user={profile}/>
                    </div>
                    <div className="content">
                        <Activities activities={activities}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({firestore,firebase}) =>{
    if (Object.keys(firestore.ordered).length > 0){ // Comprobamos que ya se recibio informacion desde firestore
        return {
            profile: firebase.profile,
            authState: firebase.auth,
            activities: firestore.ordered.activities
        }
    }else{
        return {
            authState: firebase.auth,
            activities: []
        }
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {

        const {history} = props;
        let group = '';
        if('userData' in history.location.state)
            group = history.location.state.userData.group;

        return [
            {
                collection: 'activities',
                orderBy: ['date', 'desc'],
                where: ['group', '==', group]
            }
        ]

    })
)(Home);
