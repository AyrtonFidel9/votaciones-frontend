import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionUpdateJustificacion } from "../../../redux/states/justificaciones";
import { useCookies } from "react-cookie";

export const useActualizarDatos = ({ setHabBtn, data }) => {
  const [cookies] = useCookies(["access-token"]);
  const dispatch = useDispatch();

  const [alertMessage, setAlertMessage] = useState({
    isView: false,
    titulo: "",
    content: "",
    count: 0,
    tipo: "error",
    variante: "",
  });

  const actualizarDatos = (form) => {
    setHabBtn(false);
    const resp = dispatch(
      actionUpdateJustificacion(data.state.id, form, cookies["access-token"])
    );

    resp.then((msg) => {
      if (msg === true) {
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Proceso terminado satisfactoriamente",
          content: "Inscripción actualizada con exito",
          count: ++prev.count,
          tipo: "success",
          variante: "filled",
        }));
        setHabBtn(true);
      } else {
        setAlertMessage &&
          setAlertMessage((prev) => ({
            isView: true,
            titulo: "Error",
            content: msg,
            count: ++prev.count,
            tipo: "error",
            variante: "filled",
          }));
        setHabBtn(true);
      }
    });
  };

  return [actualizarDatos, alertMessage];
};
