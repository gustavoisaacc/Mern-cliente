import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/autenticacion/authContext';
const Login = (props) => {


    //extrare alerta
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado,iniciarSesion} = authContext

    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })

    const {email, password} = usuario;

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

    const onChange = e=>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e=>{
        e.preventDefault()

        //validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }
        //pasarlos al action
        iniciarSesion({email, password})
    }

    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> ) :null}
            <div className="contenedor-form sombra-dark">
                <h1>Inicio Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
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
                        <input type="submit" value="Iniciar Sesión" className="btn btn-primario btn-block"/>
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">Registrarte</Link>
            </div>
        </div>
     );
}
 
export default Login;