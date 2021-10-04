import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })

    const {email, password} = usuario;

    const onChange = e=>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e=>{
        e.preventDefault()


        //validar que no haya campos vacios

        //pasarlos al action
    }

    return ( 
        <div className="form-usuario">
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