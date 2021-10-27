import React, { useReducer } from 'react'

import alertsReducer from "./alertsReducer";
import alertContext from "./alertsContext";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types' 

const AlertaState = (props) => {
    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertsReducer, initialState);

    //funsion
    const mostrarAlerta = (msg, categoria) =>{

        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(()=>{
            dispatch({
                type: OCULTAR_ALERTA
            })

        }, 5000)
    }

    return ( 
        <alertContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertContext.Provider>
     );
}
 
export default AlertaState;