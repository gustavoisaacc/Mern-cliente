import React, {useContext} from 'react';
import proyectoContext from '../../context/project/proyectoContext';
import TareaContext from '../../context/tasks/tareaContext';

const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext)
    const {poryectoActual} = proyectosContext;

    //context de tarea
    const tareasContext = useContext(TareaContext)
    const {obtenerTareas} = tareasContext;

    //funcion extrae proyectos
    const seleccionarProyecto = id =>{
        poryectoActual(id)
        obtenerTareas(id)
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=> seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;