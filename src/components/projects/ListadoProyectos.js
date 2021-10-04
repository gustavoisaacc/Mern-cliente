import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';

import proyectoContext from '../../context/project/proyectoContext';

const ListadoProyectos = () => {
    const proyectosContext = useContext(proyectoContext)
    const {proyectos, obtenerProyecto} = proyectosContext;

    useEffect(() => {
        obtenerProyecto()
    },[])

    //REVISAR SI PROYECTOS TIENE CONTENIDO
    if(proyectos.length === 0 ) return null;

    return ( 
        <ul className="listado-proyectos">
            {proyectos.map(proyecto=>(
                <Proyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                />
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;