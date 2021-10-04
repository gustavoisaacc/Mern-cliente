import React, {useReducer} from 'react';

import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTOS,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA
} from '../../types'

const TareaState = (props)=> {
    const initialState = {
        tareas: [
            {id: 1, nombre: 'elegir color', estado: false, proyectoId: 2},
            {id: 2, nombre: 'elegir hosting', estado: false, proyectoId: 3},
            {id: 3, nombre: 'elegir platafoma de pago', estado: true, proyectoId: 4},
            {id: 4, nombre: 'elegir platafoma', estado: true, proyectoId: 1},
            {id: 5, nombre: 'elegir color', estado: false, proyectoId: 2},
            {id: 6, nombre: 'elegir hosting', estado: false, proyectoId: 3},
            {id: 7, nombre: 'elegir platafoma', estado: true, proyectoId: 1},
            {id: 8, nombre: 'elegir platafoma', estado: true, proyectoId: 4},
            {id: 9, nombre: 'elegir color', estado: false, proyectoId: 2},
            {id: 10, nombre: 'elegir hosting', estado: false, proyectoId: 3},
        ],
        tareasproyecto: null,
        errortarea: false
    }

    //creamos state action
    const [state, dispatch] = useReducer(tareaReducer, initialState)
    
    //creamos las funciones
     

    //obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTOS,
            payloat: proyectoId

        })
    }

    const agregarTarea = (tarea)=>{
        dispatch({
            type: AGREGAR_TAREAS,
            payloat: tarea,
        })
    }

    const validarTarea = ()=>{
        dispatch({
            type: VALIDAR_TAREA

        })
    }
    const deleteTarea = id =>{
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                deleteTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;