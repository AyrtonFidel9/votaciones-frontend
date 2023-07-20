import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionGetAllElecciones } from "../../../redux/states/elecciones";
import { actionGetAllJustificaciones } from "../../../redux/states/justificaciones";
import { actionGetAllUsuariosCuenta } from "../../../redux/states/usuariosCuenta";

export const useJusSEJoin = () => {
  const [cookies] = useCookies(["access-token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetAllJustificaciones(cookies["access-token"]));
    dispatch(actionGetAllUsuariosCuenta(cookies["access-token"]));
    dispatch(actionGetAllElecciones(cookies["access-token"]));
  }, [dispatch]);

  const justificaciones = useSelector((store) =>
    store.justificaciones.map((item) => {
      const us = store.usuariosCuenta.find((a) => a.id == item.idSocio);
      const elec = store.elecciones.find((a) => a.id == item.idElecciones);
      return {
        id: item.id,
        nombre: item.nombre,
        documento: item.documento,
        estado: item.estado,
        socio: `${us.nombres} ${us.apellidos}`,
        eleccion: elec?.nombre,
        fecha: item.fecha,
        idSocio: item.idSocio,
        idElecciones: item.idElecciones,
      };
    })
  );

  return [justificaciones];
};
