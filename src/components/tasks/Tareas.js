import React, {useContext} from 'react';
import proyectoContext from '../../context/project/proyectoContext';
import TareaContext from '../../context/tasks/tareaContext';

const Tareas = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;


    //context tarea
    const tareasContext = useContext(TareaContext)
    const {deleteTarea,obtenerTareas,guardarActualizarTarea,editarTarea} = tareasContext

    const [poryectoActual] = proyecto

    const deletee = id => {
        deleteTarea(id, poryectoActual._id)

        obtenerTareas(poryectoActual.id)
    }
    const estadoTarea = tarea =>{
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        guardarActualizarTarea(tarea)
    }
    const selecionarTarea = tarea =>{
        editarTarea(tarea)
    }

    return ( 
        <li className="tarea sombre">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                ?   <button
                        type='button'
                        className="completo"
                        onClick={()=> estadoTarea(tarea)}
                    >Completo</button>
                :  <button
                        type='button'
                        className="incompleto"
                        onClick={()=> estadoTarea(tarea)}
                    >Incompleto</button>
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=> selecionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=> deletee(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tareas;
