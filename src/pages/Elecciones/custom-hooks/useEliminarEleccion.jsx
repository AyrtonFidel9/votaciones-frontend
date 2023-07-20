import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionDeleteElecciones } from "../../../redux/states/elecciones";
import { useCookies } from "react-cookie";

export const useEliminarEleccion = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["access-token"]);
  const [alertMessage, setAlertMessage] = useState({
    isView: false,
    titulo: "",
    content: "",
    count: 0,
    tipo: "error",
    variante: "",
  });

  const eliminarEleccion = (idEleccion, token = cookies["access-token"]) => {
    const resp = dispatch(actionDeleteElecciones(idEleccion, token));
    resp.then((msg) => {
      if (msg === true) {
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Proceso terminado satisfactoriamente",
          content: "Elección eliminada con exito",
          count: ++prev.count,
          tipo: "success",
          variante: "filled",
        }));
      } else {
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Error",
          content: msg,
          count: ++prev.count,
          tipo: "error",
          variante: "filled",
        }));
      }
    });
  };

  return [eliminarEleccion, alertMessage];
};
