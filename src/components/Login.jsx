import React, { useState } from 'react'

import Uno from '../assets/1.png'
import Dos from '../assets/2.png'
import Tres from '../assets/3.png'

import {app} from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(app)

const Login = () => {

    const [registro, setRegistro] = useState(false)

    const handlerSubmit = async(e)=>{
        e.preventDefault()
        const correo = e.target.email.value; 
        const contraseña = e.target.contraseña.value;
        
        if(registro){ //REgister

            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña)
                createNewStructureUser(user.uid)
            } catch (error) {
                console.log({error});
                console.log(error.customData._tokenResponse.error.message);
                if (error.customData._tokenResponse.error.message === 'EMAIL_EXISTS') {
                    console.log('Nop, ya existe un usuario');
                }
            }
           

        }
        else{ //Login  

            try {
                await signInWithEmailAndPassword(auth, correo, contraseña)
            } catch (error) {
                console.log({error});
                console.log(error.code);
                if (error.code=== 'auth/invalid-login-credentials') {
                    console.log('Nop, Credenciales incorrectas');
                }
            }
        }
    }

  return (
    <div className='row container p-4'>
        <div className='col-md-8'>
              <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                      <div className="carousel-item active">
                          <img src={Uno} alt="" className='tamaño-imagen' />
                      </div>
                      <div className="carousel-item">
                          <img src={Dos} alt="" className='tamaño-imagen' />
                      </div>
                      <div className="carousel-item">
                          <img src={Tres} alt="" className='tamaño-imagen' />
                      </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                  </button>
              </div>
        </div>
        {/* En esta seccion sera el formulario */}
        <div className="col-md-4">
            <div className='mt-5 ms-5'>
                <h1>{registro ? 'registrate' : 'inicia sesion'}</h1>
                <form onSubmit={handlerSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Direccion de Email: </label>
                        <input type="email" className='form-control' placeholder='Ingresar email' id='email' required />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Contraseña: </label>
                        <input type="password" className='form-control' placeholder='Ingresar contraseña' id='contraseña' required />
                    </div>

                    <button className='btn btn-primary' type='submit'>
                        {registro ? 'registrate' : 'inicia sesion'}
                    </button>

                </form>

                <div className='form-group'>
                    <button className='btn btn-secondary mt-4 form-control' onClick={()=> setRegistro(!registro)}>
                        {registro ? 'ya tienes una cuenta? Inicia sesion' : 'no tines una cuenta? Registrate'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login