import React from "react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops, página no encontrada</h1>
      <p>La página que estás buscando no se pudo encontrar.</p>
      <img
        src={require("./assets/notfound.jpg")}
        alt="Error 404"
        style={{
          maxWidth: "560px",
          width: "100%",
          height: "auto",
          marginTop: "20px",
        }}
      />
    </div>
  );
};

export default NotFound;
