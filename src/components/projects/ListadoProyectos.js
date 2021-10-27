import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';

import proyectoContext from '../../context/project/proyectoContext';
import AlertaContext from '../../context/project/proyectoContext'

const ListadoProyectos = () => {
    const proyectosContext = useContext(proyectoContext)
    const {mensaje ,proyectos, obtenerProyecto} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyecto()
        //eslint-disable-next-line
    },[mensaje])

    //REVISAR SI PROYECTOS TIENE CONTENIDO
    if(proyectos.length === 0 ) return null;

    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>alerta.mensaje</div>) : null}
            {proyectos.map(proyecto=>(
                <Proyecto
                    key={proyecto._id}
                    proyecto={proyecto}
                />
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;