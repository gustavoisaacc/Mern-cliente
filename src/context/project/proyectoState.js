import React, {useReducer} from 'react';
import { v4 as uuid } from 'uuid';

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';


const ProyectosState = (props) => {
    const proyectos = [
        {id: 1,nombre: 'Nuevo proyeto'},
        {id:2,nombre: 'App starte'},
        {id:3,nombre: 'App starte'}
    ]

    const initState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null
    }
    //dispach para ejecutar  las acciones 
    const [state, dispatch] = useReducer(proyectoReducer,initState)

    //cerie de funciones para el crud
    const mostrarFormulario = ()=>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    const obtenerProyecto = () =>{
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }
    const agregarProyecto = proyecto=>{
        proyecto.id = uuid();

        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    const mensajeError = ()=> {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const poryectoActual = proyectoId =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
    
    const eliminarProyecto = proyectoId =>{
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyecto,
                agregarProyecto,
                mensajeError,
                poryectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
 
export default ProyectosState;