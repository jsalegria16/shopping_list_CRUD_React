import React, { useEffect, useState } from "react";

import {db,app } from '../credenciales'
import {getAuth, signOut } from 'firebase/auth'

import {getFirestore,collection,addDoc,getDocs,getDoc,doc, setDoc,deleteDoc} from 'firebase/firestore'


const auth = getAuth(app);

const Home = ({correoUsuario,idusario}) => {

    //PAra el formulario 
    const valorInicial = { // PAra REsetear, etc.
        nombre:'',
        precio:'',
        cantidad:''
    }

    //Variables de estado
    const [producto,setProducto] = useState(valorInicial) // EStado. COntext? //Producto a enviar
    const [listaProductos, setListaProductos] = useState([]) // Para traer la lista de productos
    const [deleUpdate, setdeleUpdate] = useState(true) // Para el use effect cada vez que la DB cambia 
    const [idToUpdate, setIdToUpdate] =  useState('')


    // Funciones formulario
    const capturarInputs = (evento) => {
        //En esta función capturo cada cambion de los campos de texto 
        const {name,value} = evento.target; //Desestructuracion, puede ser name nombre o name precio o name cantidad
        setProducto({...producto,[name]:value})
        console.log(producto);

    }

    const guradarDatos = async (evento) =>  {
        evento.preventDefault();
        console.log('Procucto a anviar a la DB',producto);
        try {
            const reference = collection(db,'users','GvdXGaH0K0rKBnDyi9Xo','shopping_lists','WdKlanSDHojLwTDWAPxZ','productos')
            // const reference3 = collection(db,'users','GvdXGaH0K0rKBnDyi9213123','shopping_lists')
            await addDoc(reference,{...producto})
            // await addDoc(reference3,{nombre:'galeria'})
            console.log('Producto enviado');
        } catch (error) {
            console.log(error);
        }
        setdeleUpdate(!deleUpdate)
        setProducto({...valorInicial})
    }


    // Funciones mostrar datos
    useEffect(()=>{
        const getListaProductos = async() => {
            try {
                const referencia = collection(db,'users','GvdXGaH0K0rKBnDyi9Xo','shopping_lists','WdKlanSDHojLwTDWAPxZ','productos')
                const dataFromDb = await getDocs(referencia)
                const products = []
                dataFromDb.forEach((data) =>{
                    products.push({...data.data(),id:data.id}) //unir los productos con su id
                })
                setListaProductos(products)
                console.log('Lo qie me llega de la DB: ', listaProductos);
                
            } catch (error) {
                console.log(error);
            }
        }

        getListaProductos() // Esta declaracion de la finc es la forma correcta :)

    },[deleUpdate])


    // Funciones crud - delete
    const deleteProduct = async (id) =>{
        await deleteDoc(doc(db,'users','GvdXGaH0K0rKBnDyi9Xo','shopping_lists','WdKlanSDHojLwTDWAPxZ','productos',id))
        console.log('Deletado');
        setdeleUpdate(!deleUpdate)
    }


    // Funciones crud - update - Solo un documento.
    //con getTheOneToUpdate y el useeffcet siguiente, seteo al formulario los valores del producto que quier actualizar
    const getTheOneToUpdate = async (id) => {
        try {
            const reference = doc(db,'users','GvdXGaH0K0rKBnDyi9Xo','shopping_lists','WdKlanSDHojLwTDWAPxZ','productos',id)
            const DocFromDb = await getDoc(reference)
            console.log('Vamos a setear al formulario esto: ', DocFromDb.data());
            setProducto(DocFromDb.data())
        } catch (error) {
            console.log({error});
        }
    }
    useEffect(()=>{

        if (idToUpdate !== '') { //Si no está vacio
            getTheOneToUpdate(idToUpdate)
        }

    },[idToUpdate]) // Si idToUpdate cambia, hacemos peticion


    



    return(

        <div className="container">
            <p>Hola  <strong>{correoUsuario}</strong> Haz iniciado sesion <strong>{idusario}</strong></p>

            <button className="btn btn-primary" onClick={()=>signOut(auth)}> 
                Cerrar sesion
            </button>

            <hr />

            <div>

                <div className="row"> 
                    {/* El formulario */}
                    <div className="col-md-4"> 
                        <h3 className="text-center mb-3">Ingresa datos de usuario</h3>
                        <form onSubmit={guradarDatos}>
                            <div className="card card-body">

                                <div className="form-group">

                                    <input type="text" name='nombre' className="form-control mb-4" 
                                        placeholder="ingresar nombre producto" onChange={capturarInputs} value={producto.nombre}/>
                                    <input type="text" name='precio' className="form-control mb-4" 
                                        placeholder="ingresar precio producto" onChange={capturarInputs} value={producto.precio}/>
                                    <input type="text" name='cantidad' className="form-control mb-4" 
                                        placeholder="ingresar cantidad producto" onChange={capturarInputs} value={producto.cantidad}/>

                                </div>

                                <button className="btn btn-primary">
                                    Guardar
                                </button>

                            </div>


                        </form>
                    </div>

                    {/* Lista de productos */}
                    <div className="col-md-8">
                        <h3 className="text-center">Lista de productos</h3>

                        <div className="container card">
                            <div className="card-body  ">
                                {
                                    listaProductos.map(product => (
                                        <div key={product.id}>
                                            <p>nombre: {product.nombre} </p>
                                            <p>precio: {product.precio} </p>
                                            <p>cantidad: {product.cantidad}</p>

                                            <button className="btn btn-danger" onClick={()=>deleteProduct(product.id)}>Delete</button>
                                            <button className="btn btn-success m-1" 
                                                onClick={()=>setIdToUpdate(product.id)} 
                                                // ID Para actualizar en producti
                                            >
                                                Update
                                            </button>

                                            <hr />
                                        </div>
                                    ))
                                }

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export {Home}