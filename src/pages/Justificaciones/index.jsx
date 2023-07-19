import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Plantilla } from "../../components";
import { actionGetAllElecciones } from "../../redux/states/elecciones";
import { actionGetAllJustificaciones } from "../../redux/states/justificaciones";
import { actionGetAllUsuariosCuenta } from "../../redux/states/usuariosCuenta";
import { Grid } from "@mui/material";
import { renderStateJustificacion } from "./utils";
import { TableJustificaciones } from "./components";
import { PrivateRoutes } from "../../routes";

export default function Justificaciones() {
  const eleccionesLista = useSelector((store) => store.elecciones);

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
        idEleccion: item.idElecciones,
      };
    })
  );
  const [cookies] = useCookies(["access-token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetAllJustificaciones(cookies["access-token"]));
    dispatch(actionGetAllUsuariosCuenta(cookies["access-token"]));
    dispatch(actionGetAllElecciones(cookies["access-token"]));
  }, [dispatch]);

  const columnsJustificaciones = [
    {
      field: "id",
      headerClassName: "header-theme",
      headerName: "Id",
      width: 70,
    },
    {
      field: "nombre",
      headerClassName: "header-theme",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "documento",
      headerClassName: "header-theme",
      headerName: "Documento",
      width: 200,
    },
    {
      field: "estado",
      headerClassName: "header-theme",
      headerName: "Estado",
      width: 140,
      renderCell: (params) => {
        return renderStateJustificacion(params.row.estado);
      },
    },
    {
      field: "fecha",
      headerClassName: "header-theme",
      headerName: "Fecha",
      width: 230,
    },
    {
      field: "socio",
      headerClassName: "header-theme",
      headerName: "Socio",
      width: 230,
    },
    {
      field: "eleccion",
      headerClassName: "header-theme",
      headerName: "Elección",
      width: 230,
      renderCell: (params) => {
        const el = eleccionesLista.find((a) => a.id == params.row.idEleccion);
        return el.nombre;
      },
    },
  ];

  return (
    <Plantilla pagina="Justificaciones">
      <Grid container>
        <TableJustificaciones
          columns={columnsJustificaciones}
          rows={justificaciones}
          activeCheck={false}
          reviewProcRoute={PrivateRoutes.JUSTIFICACIONES_REVIEW}
        />
      </Grid>
    </Plantilla>
  );
}
