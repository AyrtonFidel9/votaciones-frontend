import { renderStateJustificacion } from "../utils";
import { useElecciones } from "../../../custom-hooks";

export const useColumnsJustificacion = () => {
  const [elecciones] = useElecciones();
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
        const el = elecciones.find((a) => a.id == params.row.idElecciones);
        return el.nombre;
      },
    },
  ];

  return [columnsJustificaciones];
};
