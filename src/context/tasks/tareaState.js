import React, {useReducer} from 'react';

import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTOS,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types'

import clienteAxios from '../../config/axios';

const TareaState = (props)=> {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //creamos state action
    const [state, dispatch] = useReducer(tareaReducer, initialState)
    
    //creamos las funciones
     

    //obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
       try {
        const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
        console.log(resultado);
        dispatch({
            type: TAREAS_PROYECTOS,
            payload: resultado.data.tareas
        })
       } catch (error) {
           console.log(error)
       }
    }

    const agregarTarea = async (tarea) =>{
        try {
            const respuesta = await clienteAxios.post('/api/tareas', tarea);
            console.log(respuesta)

            dispatch({
                type: AGREGAR_TAREAS,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validarTarea = ()=>{
        dispatch({
            type: VALIDAR_TAREA

        })
    }
    const deleteTarea = async (id, proyecto) =>{
       
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
           console.log(error)
        }
    }
    const guardarActualizarTarea = async tarea =>{
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }
    const editarTarea = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
   

    return(
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                deleteTarea,
                editarTarea,
                guardarActualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;