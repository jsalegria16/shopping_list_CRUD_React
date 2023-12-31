import React, { useState } from "react";

import Uno from "../assets/1.png";
import Dos from "../assets/2.png";
import Tres from "../assets/3.png";

import { app } from "../Firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { CreateNewUser } from "../Firebase/CreateUser";
import { GlobalContext } from "../Context";
const auth = getAuth(app);

const Login = () => {
  // const {usuario}= React.useContext(GlobalContext)
  const [registro, setRegistro] = useState(false);
  const [CampoVacio, setCampoVacio] = useState(false); // Para el use effect cada vez que la DB cambia

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.contraseña.value;

    if (correo == "" || contraseña == "") {
      setCampoVacio(true);
    } else {
      setCampoVacio(false);
      if (registro) {
        //REgister
        // await createUserWithEmailAndPassword(auth, correo, contraseña)
        createUserWithEmailAndPassword(auth, correo, contraseña)
          .then((resolve) => {
            console.log(
              "Lo que me regresa la promesa en el registro: ",
              resolve
            );
            console.log(
              "El UID del nuevo usuario creado: ",
              resolve._tokenResponse.localId
            );
            const UID = resolve._tokenResponse.localId;
            const email = resolve._tokenResponse.email;
            CreateNewUser(UID, email);
          })
          .catch((error) => {
            console.log(error);
            console.log("Estoy en el catch del then");
            console.log(error.customData._tokenResponse.error.message);
            if (
              error.customData._tokenResponse.error.message === "EMAIL_EXISTS"
            ) {
              console.log("Nop, ya existe un usuario");
            }
          });
      } else {
        //Login

        try {
          await signInWithEmailAndPassword(auth, correo, contraseña);
        } catch (error) {
          console.log({ error });
          if (error.code === "auth/invalid-login-credentials") {
            console.log("Nop, Credenciales incorrectas");
          }
        }
      }
    }
  };

  return (
    <div className="row container p-4">
      <div className="col-md-8">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Uno} alt="" className="tamaño-imagen" />
            </div>
            <div className="carousel-item">
              <img src={Dos} alt="" className="tamaño-imagen" />
            </div>
            <div className="carousel-item">
              <img src={Tres} alt="" className="tamaño-imagen" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next "
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* En esta seccion sera el formulario */}
      <div className="col-md-4">
        <div className="mt-5 ms-5">
          <h1>{registro ? "registrate" : "inicia sesion"}</h1>
          {CampoVacio == true ? (
            <>
              <div
                className="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <strong>Campos vacios!</strong> Intentalo nuevamente.
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => {
                    setCampoVacio(false);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          <form onSubmit={handlerSubmit}>
            <div className="mb-3">
              <label className="form-label">Direccion de Email: </label>
              <input
                type="email"
                className="form-control"
                placeholder="Ingresar email"
                id="email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña: </label>
              <input
                type="password"
                className="form-control"
                placeholder="Ingresar contraseña"
                id="contraseña"
                required
              />
            </div>

            <button className="btn btn-primary" type="submit">
              {registro ? "registrate" : "inicia sesion"}
            </button>
          </form>

          <div className="form-group">
            <button
              className="btn btn-secondary mt-4 form-control"
              onClick={() => setRegistro(!registro)}
            >
              {registro
                ? "ya tienes una cuenta? Inicia sesion"
                : "no tines una cuenta? Registrate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
