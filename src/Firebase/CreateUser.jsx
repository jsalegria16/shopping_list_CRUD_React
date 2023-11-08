/* En este archivo se crea toda la estructura para los nuevos usuarios que se registran   */
import {getFirestore,collection,addDoc,getDocs,getDoc,doc, setDoc,deleteDoc} from 'firebase/firestore'
import {db,app } from './credenciales'
import React from 'react'
import { GlobalContext } from '../Context'




const InitialShoppingList = {nombre_lista : 'galeria'}
const InitialProduct= {cantidad : 2, nombre:'My producto', precio: 3500}


const CreateNewUser = async (uid,email) => { // Vamos a abstraer cosas

    // Aquí se crea el user en la base de datos
    await setDoc(doc(db,'users',uid),{'correo':email})

    // Aquí se crea una subcoleccion de listas de compras, dentro del nuevo usuario, llamada galería
    await setDoc(doc(db,'users',uid,'shopping_lists', "Random-SL-ID-DF"), InitialShoppingList);

    //Dentro de la nuevas lista de compras, se agrega un producto random
    await setDoc(doc(db,'users',uid,'shopping_lists', "Random-SL-ID-DF",'productos','Random-Product-ID-DF'), InitialProduct);
    

}



export {CreateNewUser}; 