import React,{Fragment,Component} from 'react';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions/authActions";

class Sidebar extends Component{

    render() {
        const { signOut, user } = this.props;

       if (user === undefined) return (<Fragment></Fragment>);

        return (
            <Fragment>
                <nav>

                    <details open={true}>
                        <summary>{user.name}</summary>
                        <ol onClick={signOut}>Cerrar sesión</ol>
                    </details>

                    <details open={true}>
                        <summary >Actividades</summary>
                        <ol>Lista</ol>
                        <ol>Propias</ol>
                    </details>

                </nav>
            </Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch) =>{
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(Sidebar);
