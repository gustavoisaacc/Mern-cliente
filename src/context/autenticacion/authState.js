import React, {useReducer} from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token'

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types'

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registarUsuario = async datos => {

        try {
            const respuesta = await clienteAxios.post('/api/usuario', datos)
            console.log(respuesta)

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            //obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            // console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //retorna el usuario auteticado
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token)
        }
        
        try {
            const respuesta = await clienteAxios.get('/api/auth')
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })

        } catch (error) {
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    //iniciar sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            // obtener usuario
            usuarioAutenticado()

        } catch (error) {
            console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //cierra la sesion del usuario
    const cerrarSesion =  () => {
        dispatch({
            type: CERRAR_SESION

        })
    }

    return ( 
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion


            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;
