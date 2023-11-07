import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const GlobalContext = React.createContext()

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {app} from '../credenciales'

const auth = getAuth(app)

function GlobalProvider ({children}) { // Se usa mas este, uno Provider personalizado

    /*Aquí se encapsula lógica para compartir entre toda la APP , la lógica de App.js*/

    // const { 
    //     item,
    //     saveItems,
    // } = useLocalStorage('pru',123);

    const item = 9;
    const saveItems = 9;

    const [usuario, setUsuario] = useState(null)

    onAuthStateChanged(auth, (usuarioFirebase) =>{
    if(usuarioFirebase){
        setUsuario(usuarioFirebase)
    }
    else{
        setUsuario(null)
    }
    })

   



    return(
        <GlobalContext.Provider 
        value={{
            item,
            saveItems,
            usuario
        }}>

            {children}

        </GlobalContext.Provider>
    );
}

function GlobalConsumer() { 
    
    return(
        <GlobalContext.Consumer>

        </GlobalContext.Consumer>
    );
}



export {GlobalContext,GlobalConsumer,GlobalProvider}