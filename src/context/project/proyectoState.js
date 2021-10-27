import React, {useReducer} from 'react';
import clienteAxios from '../../config/axios'

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';


const ProyectosState = (props) => {

    const initState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }
    //dispach para ejecutar  las acciones 
    const [state, dispatch] = useReducer(proyectoReducer,initState)

    //cerie de funciones para el crud
    const mostrarFormulario = ()=>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    const obtenerProyecto = async () =>{
        const resultado = await clienteAxios.get('/api/proyectos')

        try {
           
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    const agregarProyecto = async proyecto=>{
        
        try {
           const resultado = await clienteAxios.post('/api/proyectos', proyecto)
        
           //insertar el proyecto
           dispatch({
               type: AGREGAR_PROYECTO,
               payload: resultado.data
           })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
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
    
    const eliminarProyecto = async proyectoId =>{
              
        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
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