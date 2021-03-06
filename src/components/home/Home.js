import React,{Fragment,Component} from 'react'
import Sidebar from "./Sidebar";
import '../../assets/css/home.css'
import Activities from "../activity/Activities";
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import {compose} from 'redux';

class Home extends Component{

    render() {
        const {activities,authState,history,profile,usersGroup} = this.props;


        if(!authState.uid) history.push('/login');

        return (
            <Fragment>
                <div className="wrapper">
                    <div className="sidebar">
                        <Sidebar user={profile}/>
                    </div>
                    <div className="content">
                        <Activities activities={activities} usersGroup={usersGroup} user={profile}/>
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
            activities: firestore.ordered.activities,
            usersGroup:firestore.ordered.users
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
    /* Obtenemos las actividades del grupo que pertenece el usuario */
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

    }),
    /* Conmsulta de los usuarios con el mismo grupo del usuario actual */
    firestoreConnect((props) => {
        const {history} = props;
        let group = '';
        if('userData' in history.location.state)
            group = history.location.state.userData.group;
        return [
            {
                collection: 'users',
                orderBy: ['name', 'asc'],
                where: ['group', '==', group]
            }
        ]

    })
)(Home);
