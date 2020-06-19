import React,{Fragment,Component} from 'react'
import Sidebar from "./Sidebar";
import '../../assets/css/home.css'
import Activities from "../activity/Activities";

class Home extends Component{
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <div className="sidebar">
                        <Sidebar/>
                    </div>
                    <div className="content">
                        <Activities/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;
