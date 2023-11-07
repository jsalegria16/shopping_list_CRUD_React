import React, {useState} from 'react'


import './App.css'

import {Home} from './components/Home'
import Login from './components/Login'





import {GlobalContext } from './Context'




function App() {

  const {item,saveItems,usuario}= React.useContext(GlobalContext)

  console.log(usuario);


  
  

  return (
    <div className=''>
      {usuario ? <Home 
                    correoUsuario={usuario.email} 
                    idusario={usuario.uid} 
                    displayNAme = {usuario.displayName}
                     
                  /> : <Login/>}  
    </div>      
  )
}

export default App