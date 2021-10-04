import React from 'react';
import SideBar from '../layout/SideBar';
import Barra from '../layout/Barra';
import FormTareas from '../tasks/FormTareas';
import ListadoTareas from '../tasks/ListadoTareas';

const Proyectos = () => {
    return ( 
        <div className="contenedor-app">
            <SideBar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTareas/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>

     );
}
 
export default Proyectos;