import { addHours } from "../utils";
import ChipTable from "../../../components/DataGridTable/ChipTable";
import {
  useUsuariosCuenta,
  useRepresentantes,
  useAgencias,
} from "../../../custom-hooks";

const renderNewCellValue = (params) => {
  switch (params.row.estado) {
    case "EN-CURSO":
      return (
        <ChipTable text="En curso" size="medium" icon="live" color="success" />
      );
    case "EXITOSO":
      return (
        <ChipTable text="Exitosa" size="medium" icon="check" color="success" />
      );
    case "NULIDAD":
      return (
        <ChipTable text="Nulidad" size="medium" icon="error" color="error" />
      );
    case "IMPUGNADO":
      return (
        <ChipTable text="Impugnado" size="medium" icon="error" color="error" />
      );
    case "NO-INICIADO":
      return (
        <ChipTable text="No iniciado" size="medium" icon="stop" color="info" />
      );
  }
};

export const useColumnsElecciones = () => {
  const [usuariosCuenta] = useUsuariosCuenta();
  const [representantes] = useRepresentantes();
  const [agencias] = useAgencias();

  const columnsElecciones = [
    {
      field: "id",
      headerClassName: "header-theme",
      headerName: "Id",
      width: 70,
    },
    {
      field: "agencia",
      headerClassName: "header-theme",
      headerName: "Agencia",
      width: 150,
      renderCell: (params) => {
        const value = agencias.filter((r) => r.id === params.row.idAgencia);
        return value[0].nombre;
      },
    },
    {
      field: "nombre",
      headerClassName: "header-theme",
      headerName: "Nombre/Título",
      width: 250,
    },
    {
      field: "dia",
      headerClassName: "header-theme",
      headerName: "Fecha",
      width: 100,
    },
    {
      field: "hora",
      headerClassName: "header-theme",
      headerName: "Hora Inicio",
      width: 100,
    },
    {
      field: "horaFin",
      headerClassName: "header-theme",
      headerName: "Hora Fin",
      width: 100,
      renderCell: (params) => {
        return addHours(params.row.hora, params.row.duracion);
      },
    },
    {
      field: "estado",
      headerClassName: "header-theme",
      headerName: "Estado",
      width: 200,
      renderCell: renderNewCellValue,
    },
    {
      field: "duracion",
      headerClassName: "header-theme",
      headerName: "Duracion",
      width: 100,
    },
    {
      field: "representantes",
      headerClassName: "header-theme",
      headerName: "Representantes",
      width: 150,
      renderCell: (params) => {
        const _representantes = representantes.filter(
          (i) => i.idElecciones === params.row.id
        );
        return _representantes.length;
      },
    },
    {
      field: "sufragantes",
      headerClassName: "header-theme",
      headerName: "Sufragantes",
      width: 100,
      renderCell: (params) => {
        return usuariosCuenta.filter(
          (i) => i.idAgencia === params.row.idAgencia
        ).length;
      },
    },
  ];

  return [columnsElecciones];
};
