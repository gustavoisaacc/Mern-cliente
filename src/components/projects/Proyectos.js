import React, {useContext, useEffect} from 'react';
import SideBar from '../layout/SideBar';
import Barra from '../layout/Barra';
import FormTareas from '../tasks/FormTareas';
import ListadoTareas from '../tasks/ListadoTareas';

import AuthContext from '../../context/autenticacion/authContext';

const Proyectos = () => {
    //extraer informacion de autenticacion
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    useEffect(()=> {
        usuarioAutenticado()
        
        //eslint-disable-next-line
    },[])

    return ( 
        <div className="contenedor-app">
            <SideBar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTareas/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>

     );
}
 
export default Proyectos;