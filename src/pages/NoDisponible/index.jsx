import React from "react";

export default function NoDisponible() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops, acceso denegado</h1>
      <p>
        Lo sentimos, no tienes los permisos necesarios para acceder a esta
        página.
      </p>
      <img src={require("./assets/denegado.png")} height={450} />
    </div>
  );
}
