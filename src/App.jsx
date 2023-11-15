import React, { useState } from "react";
import "./App.css";
import { Home } from "./components/Home";
import Login from "./components/Login";
import { GlobalContext } from "./Context";

function App() {
  const { usuario } = React.useContext(GlobalContext);

  return (
    <div className="">
      {usuario ? (
        <Home correoUsuario={usuario.email} idusario={usuario.uid} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
