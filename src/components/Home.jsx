import React, { useEffect, useState } from "react";

import {db,app } from '../Firebase/credenciales'
import {getAuth, signOut } from 'firebase/auth'

import {getFirestore,collection,addDoc,getDocs,getDoc,doc, setDoc,deleteDoc} from 'firebase/firestore'
import { GlobalContext } from "../Context";

import './shoppingList.css' 


const auth = getAuth(app);

const Home = ({correoUsuario,idusario}) => {

    const {usuario}= React.useContext(GlobalContext)

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

    const [idToUpdate, setIdToUpdate] =  useState('') // PAra identificar el ID del producto que voy a actualizar

    const [listaShoppingLists, setListaShoppingLists] = useState([]) // Para traer la lista de productos
    const [actualShoppingList, setActualShoppingList] = useState({id:'Random-SL-ID-DF',nombre_lista:'Galeria'});

     // Funcion para traer las shopping list y setear la actual category
     useEffect(()=>{
        const getListaShoppingLists = async() => {
            try {
                const referencia = collection(db,'users',usuario.uid,'shopping_lists')
                const dataFromDb = await getDocs(referencia)
                const shoppingLists = []
                dataFromDb.forEach((data) =>{
                    shoppingLists.push({...data.data(),id:data.id}) 
                })
                setListaShoppingLists(shoppingLists)
                            
            } catch (error) {
                console.log(error);
            }
        }
        getListaShoppingLists()
    },[actualShoppingList,listaShoppingLists])
       

    // Funciones formulario
    const capturarInputs = (evento) => {
        //En esta función capturo cada cambion de los campos de texto 
        const {name,value} = evento.target; //Desestructuracion, puede ser name nombre o name precio o name cantidad
        setProducto({...producto,[name]:value})
        console.log(producto);

    }

    //Funcion para actualizar o guardar los datos
    const guradarDatos = async (evento) =>  {
        evento.preventDefault();
        
        if (idToUpdate === '') { // si idToUpdate == '' está vacia, no estoy actualizando nada
            try {
                console.log('Procucto a guardar a la DB',producto);
                const reference = collection(db,'users',usuario.uid,'shopping_lists',actualShoppingList.id,'productos')
                // const reference3 = collection(db,'users','GvdXGaH0K0rKBnDyi9213123','shopping_lists')
                if (producto.cantidad !== '' && producto.precio !== '' && producto.nombre !== '' ) { // Validar qu ele producto no sea una cadena vacia
                    await addDoc(reference,{...producto})
                    // await addDoc(reference3,{nombre:'galeria'})
                    console.log('Producto enviado');  
                }else{
                    console.log('No agregues productos en blanco');
                }
                
            } catch (error) {
                console.log(error);
            }
        }else{ // Algo voy a actualizar
            console.log('Procucto a actualizar a la DB',producto);
            const reference = doc(db,'users',usuario.uid,'shopping_lists',actualShoppingList.id,'productos',idToUpdate)
            await setDoc(reference,{...producto})
            console.log('Producto actualizado!!!');
            
        }

        // ME da ganas deponer uno dentro de cada correspondencia : setIdToUpdate('') despuesd que se actualice y así...
        setIdToUpdate('')
        setdeleUpdate(!deleUpdate)
        setProducto({...valorInicial})
    }


    // Funciones mostrar datos
    useEffect(()=>{
        const getListaProductos = async() => {
            try {
                console.log('Entro a mostrar datos con SL ', actualShoppingList);
                console.log('Entro a mostrar datos con user ', usuario.uid);
                const referencia = collection(db,'users',usuario.uid,'shopping_lists',actualShoppingList.id,'productos')
                const dataFromDb = await getDocs(referencia)
                const products = []
                dataFromDb.forEach((data) =>{
                    products.push({...data.data(),id:data.id}) //unir los productos con su id
                })
                setListaProductos(products)
                console.log('Lo qie me llega de la DB: ', listaProductos);
                
            } catch (error) {
                console.log(error);
                console.log('Hay algún error');
            }
        }

        getListaProductos() // Esta declaracion de la finc es la forma correcta :)

    },[deleUpdate,actualShoppingList])//listaShoppingLists


    // Funciones crud - delete
    const deleteProduct = async (id) =>{
        console.log('Estoy entrando?');
        await deleteDoc(doc(db,'users',usuario.uid,'shopping_lists',actualShoppingList.id,'productos',id))
        console.log('Deletado');
        setdeleUpdate(!deleUpdate)

        // Bug: Cuando voy a editar un producto, y antes de editarlo lo elimino, debo limpiar el formulario
        if (id===idToUpdate) {
            setProducto(valorInicial)
        }
    }


    // Funciones crud - update - Solo un documento.
    //con getTheOneToUpdate y el useeffcet siguiente, seteo al formulario los valores del producto que quier actualizar
    const getTheOneToUpdate = async (id) => {
        try {
            const reference = doc(db,'users',usuario.uid,'shopping_lists',actualShoppingList.id,'productos',id)
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



   


    const mystyle = {
        'height': "400px",
       'max-height': "400px",
       'overflow-y': "auto",
      };

      const mystyle1 = {
        'cursor': 'pointer'
       };
   

    return(

        <div className="container">
            <p> Hola <strong> {usuario.email} </strong> Haz iniciado sesion con UID <strong>{usuario.uid}</strong></p>
            <button className="btn btn-primary" onClick={()=>signOut(auth)}> 
                Cerrar sesion
            </button>

            <hr />

            <div>

                <div className="row justify-content-around"> 

                    <div className="col-md-3  border border-primary d-flex flex-column align-items-center">
                        <h4>Listas de compras</h4>
                        <div className="container card">
                            <div className="card-body " style={mystyle}>
                                    {
                                        listaShoppingLists.map(product => (
                                            <div key={product.id} style={mystyle1} onClick={()=>{setActualShoppingList({id:product.id,nombre_lista:product.nombre_lista});console.log('Fijo un anueva ACtual SL',actualShoppingList);}}
                                                className={`CategoryItem ${product.id === actualShoppingList.id ? 'isActualCategory' : '' }`}
                                            >
                                                <p> {product.nombre_lista} </p>
                                                <hr />
                                            </div>

                                            
                                        ))

                                    }

                            </div>
                        </div>
                    </div>

                    {/* El formulario */}
                    <div className="col-md-3 border border-primary d-flex flex-column"> 
                        <h4 className="text-center mb-3"> {idToUpdate === ''? `Ingresa datos del nuevo producto de la lista ${actualShoppingList.nombre_lista}` : `Actualizar Datos del producto`} </h4>
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

                                <button className="btn btn-primary mb-3">
                                    {idToUpdate === ''? 'Agregar producto' : 'Actualizar producto'}
                                </button>
                                
                                
                            </div>


                        </form>

                        <button className={ idToUpdate === ''? '.d-none border-0' : "btn btn-primary mt-1"}
                            onClick={()=>{setIdToUpdate('');setProducto({...valorInicial})}}
                        >
                                   
                            { idToUpdate === '' ? '' : " Cancelar actualización"}

                        </button>

                    </div>

                    {/* Lista de productos */}
                    <div className="col-md-4 border border-primary">
                        <h4 className="text-center">Lista de productos en {actualShoppingList.nombre_lista} <strong></strong></h4>

                        <div className="container card">
                            <div className="card-body " style={mystyle}>
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