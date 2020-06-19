import React,{Fragment,Component} from 'react'

class Sidebar extends Component{
    render() {
        return (
            <Fragment>
                <nav>

                    <details open={true}>
                        <summary>Usuario</summary>
                        <ol>Cerrar sesión</ol>
                    </details>

                    <details open={true}>
                        <summary >Actividades</summary>
                        <ol>Lista</ol>
                        <ol>Agregar</ol>
                        <ol>Propias</ol>
                        <ol>Grupo de trabajo</ol>
                    </details>

                </nav>
            </Fragment>
        );
    }
}

export default Sidebar;
