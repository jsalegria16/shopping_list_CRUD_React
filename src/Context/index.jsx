import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const GlobalContext = React.createContext()

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {app} from '../Firebase/credenciales'
import { CreateNewUser } from "../Firebase/CreateUser";

const auth = getAuth(app)

function GlobalProvider ({children}) { 

    /*Aquí se encapsula lógica para compartir entre toda la APP*/

    // const { 
    //     item,
    //     saveItems,
    // } = useLocalStorage('pru',123);

    /*El usuario que se autentica */
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