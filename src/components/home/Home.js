import React,{Fragment,Component} from 'react'
import Sidebar from "./Sidebar";
import '../../assets/css/home.css'

class Home extends Component{
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <div className="sidebar"><Sidebar/></div>
                    <div className="content">
                        
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default Home;
