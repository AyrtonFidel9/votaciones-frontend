import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionIngresarEleccion } from "../../../redux/states/elecciones";
import { useCookies } from "react-cookie";

export const useSaveEleccion = ({ setHabBtn, setAlertMessage }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["access-token"]);

  const saveEleccion = async (form) => {
    setHabBtn(true);
    form.idAgencia = form.agencia;
    form.hora = form.hora.toLocaleTimeString();
    const resp = dispatch(
      actionIngresarEleccion(form, cookies["access-token"])
    );
    resp.then((msg) => {
      if (msg === true) {
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Proceso terminado satisfactoriamente",
          content: "Eleccion creada con exito",
          count: ++prev.count,
          tipo: "success",
          variante: "filled",
        }));
        setHabBtn(false);
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
        setHabBtn(false);
      }
    });
  };

  return [saveEleccion];
};
