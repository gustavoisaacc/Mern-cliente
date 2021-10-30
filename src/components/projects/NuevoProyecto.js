import React, { Fragment, useState,useContext } from 'react';

import ProyectoContext from '../../context/project/proyectoContext'; 

const NuevoProyecto = () => {
    const proyectoContext = useContext(ProyectoContext);
    const {formulario,errorformulario,mostrarFormulario, agregarProyecto,mensajeError} = proyectoContext
    
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });
    
    const {nombre} = proyecto;

    const onChangeProyecto = e=>{
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmitProyecto = e=>{
        e.preventDefault();

        //validar el proyecto
        if(nombre === '') {
            mensajeError()
            return
        }

        //agregar al state
        agregarProyecto(proyecto);

        //Reiniciar el formulario
        guardarProyecto({
            nombre: ''
        });
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={()=> mostrarFormulario()}
            >Nuevo Proyecto</button>
            {formulario
            
            ?  <form
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto}
                >
                    <input 
                        type="text" 
                        className="input-text"
                        name="nombre"
                        placeholder="Nombre del Proyecto"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
                    <input type="submit" value="Agregar Proyecto" className="btn btn-primario btn-block" />
                </form>
            : null

            }
            {
                errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null 
            }
          
        </Fragment> 
     );
}
 
export default NuevoProyecto;