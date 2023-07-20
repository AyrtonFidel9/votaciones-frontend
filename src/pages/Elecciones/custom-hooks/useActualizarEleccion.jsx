import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  actionGetAllElecciones,
  actionUpdateElecciones,
} from "../../../redux/states/elecciones";
import { useCookies } from "react-cookie";

export const useActualizarEleccion = ({ setHabBtn, data, setAlertMessage }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["access-token"]);

  const actualizarEleccion = async (form) => {
    const hora = form.hora.toLocaleTimeString();
    const idAgencia = form.agencia;

    const body = {
      ...form,
      hora,
      idAgencia,
    };

    const resp = dispatch(
      actionUpdateElecciones(data.state.id, body, cookies["access-token"])
    );

    setHabBtn(true);

    resp.then((msg) => {
      if (msg === true) {
        dispatch(actionGetAllElecciones(cookies["access-token"]));
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Proceso terminado satisfactoriamente",
          content: "Elección actualizada con exito",
          count: ++prev.count,
          tipo: "success",
          variante: "filled",
        }));
        setHabBtn(false);
      } else {
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

  return [actualizarEleccion];
};
