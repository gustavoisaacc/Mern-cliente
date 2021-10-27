import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    //extrare alerta
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado,registarUsuario} = authContext

    const [usuario, guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })



    //en caso de que el usuario reguistrado o sea un usuario duplicado
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    const {nombre,email, password,confirmar} = usuario;

    const onChange = e=>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e=>{
        e.preventDefault()

        //validar que no haya campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        //password min 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe se mayor a 6 caracteres', 'alerta-error')
            return
        }

        //password sean igaules
        if(password !== confirmar){
            mostrarAlerta('Los password deben ser iguales', 'alerta-error')
            return
        }

        //pasarlos al action
        registarUsuario({
            nombre,
            email,
            password
        })

    }

    return ( 
        <div className="form-usuario">
              {alerta ? ( <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> ) :null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password" 
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirmar Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" value="Crear Cuenta" className="btn btn-primario btn-block"/>
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">Iniciar Sesión</Link>
            
            </div>
        </div>
     );
}
 
export default NuevaCuenta;