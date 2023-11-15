/* En este archivo se crea toda la estructura para los nuevos usuarios que se registran   */
import {getFirestore,collection,addDoc,getDocs,getDoc,doc, setDoc,deleteDoc} from 'firebase/firestore'
import {db,app } from './credenciales'
import React from 'react'
import { GlobalContext } from '../Context'




const InitialShoppingList = {nombre_lista : 'galeria'}
const InitialShoppingList2 = {nombre_lista : 'supermercado'}
const InitialShoppingList3 = {nombre_lista : 'otros'}

const InitialProduct= {cantidad : 2, nombre:'My producto galeria', precio: 3500}
const InitialProduct2= {cantidad : 2, nombre:'My producto supermercad0', precio: 3500}
const InitialProduct3= {cantidad : 2, nombre:'My producto otros', precio: 3500}



const CreateNewUser = async (uid,email) => { // Vamos a abstraer cosas

    // Aquí se crea el user en la base de datos
    await setDoc(doc(db,'users',uid),{'correo':email})

    // Aquí se crea una subcoleccion de listas de compras, dentro del nuevo usuario, llamada galería
    await setDoc(doc(db,'users',uid,'shopping_lists', "Random-SL-ID-DF"), InitialShoppingList);
    await setDoc(doc(db,'users',uid,'shopping_lists', "Random-SL-ID-DF1"), InitialShoppingList2);
    await setDoc(doc(db,'users',uid,'shopping_lists', "Random-SL-ID-DF2"), InitialShoppingList3);

    //Dentro de la nuevas lista de compras, se agrega un producto random
    await setDoc(doc(db,'users',uid,'shopping_lists', "Random-SL-ID-DF",'productos','Random-Product-ID-DF'), InitialProduct);
    await setDoc(doc(db,'users',uid,'shopping_lists', "Random-SL-ID-DF1",'productos','Random-Product-ID-DF1'), InitialProduct2);
    await setDoc(doc(db,'users',uid,'shopping_lists', "Random-SL-ID-DF2",'productos','Random-Product-ID-DF2'), InitialProduct3);
    
    console.log('hecho');

}



export {CreateNewUser}; 

// const firebaseConfig = {
//     apiKey: "AIzaSyAfL6DU5ObKvguAgMDCHLOEEvMGLt5aGg4",
//     authDomain: "listacompras-f9f36.firebaseapp.com",
//     projectId: "listacompras-f9f36",
//     storageBucket: "listacompras-f9f36.appspot.com",
//     messagingSenderId: "714321085868",
//     appId: "1:714321085868:web:b7d3bf5a7db15dd9f96609"
//   };