import React, {useContext} from 'react';
import proyectoContext from '../../context/project/proyectoContext';
import TareaContext from '../../context/tasks/tareaContext';

const Tareas = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;


    //context tarea
    const tareasContext = useContext(TareaContext)
    const {deleteTarea,obtenerTareas} = tareasContext

    const deletee = id => {
        deleteTarea(id)
        console.log('hola')

        obtenerTareas(proyecto[0].id)
    }

    return ( 
        <li className="tarea sombre">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                ?   <button
                        type='button'
                        className="completo"
                    >Completo</button>
                :  <button
                        type='button'
                        className="incompleto"
                    >Incompleto</button>
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=> deletee(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tareas;
