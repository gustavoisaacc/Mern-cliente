import React from 'react';
import { Fragment, useContext} from 'react/cjs/react.development';

import Tareas from './Tareas'

import proyectoContext from '../../context/project/proyectoContext';
import TareaContext from '../../context/tasks/tareaContext';

const ListadoTareas = () => {
    //extraer proyectodel state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto,eliminarProyecto} = proyectosContext;

    //obtenemos las tareas
    const tareasContext = useContext(TareaContext)
    const {tareasproyecto} = tareasContext;

    //concicional si no hay proyecto seleccionado
    if(!proyecto) return <h2>Seleccione un proyecto</h2>

    //Array distructuring esxtraer el proyecto actual
    const [proyectoActual] = proyecto;


    const onClickEliminar = ()=>{
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ? <li className="tarea"><p>No hay tareas</p></li>
                    : (tareasproyecto.map((tarea)=>(
                        <Tareas
                            key={tarea._id}
                            tarea={tarea}
                        />
                    )))   
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;