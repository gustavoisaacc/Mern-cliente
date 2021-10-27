import React, {useContext,useState, useEffect} from 'react';
import proyectoContext from '../../context/project/proyectoContext';
import TareaContext from '../../context/tasks/tareaContext';


const FormTareas = () => {
    //extraer proyectodel state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //context de tarea
    const tareasContext = useContext(TareaContext)
    const {tareaseleccionada,agregarTarea, validarTarea, obtenerTareas,errortarea,guardarActualizarTarea} = tareasContext

    //use effect
    useEffect(()=>{
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }

    }, [tareaseleccionada])

    //creando el state del form
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    //extraer nombre de la tarea
    const {nombre} = tarea


    //concicional si no hay proyecto seleccionado
    if(!proyecto) return null

    //Array distructuring esxtraer el proyecto actual
    const [proyectoActual] = proyecto;

    //leer los datos del campo tareas
    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault()
        //validar
        if(nombre === '') {
            validarTarea()
            return
        }
        //agregar tareas o actualizar tareas
        if(tareaseleccionada === null){
            //agregar la nueva taera 
            tarea.proyecto = proyectoActual._id
            agregarTarea(tarea)
        }else {
            guardarActualizarTarea(tarea)
        }
        //obtener y filtrar las tareas y proyectos actuales
        obtenerTareas(proyectoActual._id)
        //reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            {errortarea ? <p className="mensaje error">La tarea debe tener un nombre</p> :null}
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block btn-submit"
                        value={tareaseleccionada ? "Editar Tarea"  : "Agregar Tarea" }
                    />
                </div>
            </form>
        </div>
     );
}
 
export default FormTareas;