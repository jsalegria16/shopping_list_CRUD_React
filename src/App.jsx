import React, {useState} from 'react'
import './App.css'
import {Home} from './components/Home'
import Login from './components/Login'

import {app} from './credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const auth = getAuth(app)

function App() {
  const [usuario, setUsuario] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase) =>{
    if(usuarioFirebase){
      setUsuario(usuarioFirebase)
    }
    else{
      setUsuario(null)
    }
  })

  return (
    <div className=''>
      {usuario ? <Home 
                    correoUsuario={usuario.email} 
                    idusario={usuario.uid} 
                     
                  /> : <Login/>}  
    </div>      
  )
}

export default App