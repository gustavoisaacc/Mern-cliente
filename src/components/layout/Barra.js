import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';


const Barra = () => {

    //extraer informacion del usuario
    const authContext = useContext(AuthContext)
    const {usuario ,usuarioAutenticado, cerrarSesion} = authContext

    useEffect( () => {
        usuarioAutenticado()

        //eslint-disable-next-line
    },[])

    return ( 
        <header className="app-header">
            {usuario ?  <p className="nombre-usuario">hola <span>{usuario.nombre}</span></p> : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank btn-primario"
                    onClick={ () => cerrarSesion()}
                >
                    Cerrar Sesiòn
                </button>
            </nav>
        </header>
     );
}
 
export default Barra;