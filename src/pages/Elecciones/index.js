import React, { useEffect, useState, useRef, useCallback } from "react";
import { Grid, Stack } from "@mui/material";
import { DataGridTable, Plantilla, AlertaCustom } from "../../components";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import ChipTable from "../../components/DataGridTable/ChipTable";
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from "react-redux";
import { addHours } from "./utils";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes";
import { deleteEleccion } from "../../services";
import { updateListas } from "../../redux/states/listas";
import { actionDeleteElecciones, actionGetAllElecciones } from "../../redux/states/elecciones";


const renderNewCellValue = (params) => {


    switch (params.row.estado) {
        case "EN-CURSO":
            return (<ChipTable
                text="En curso"
                size="medium"
                icon="live"
                color="success"
            />);
        case "EXITOSO":
            return (<ChipTable
                text="Exitosa"
                size="medium"
                icon="check"
                color="success"
            />);
        case "NULIDAD":
            return (<ChipTable
                text="Nulidad"
                size="medium"
                icon="error"
                color="error"
            />);
        case "IMPUGNADO":
            return (<ChipTable
                text="Impugnado"
                size="medium"
                icon="error"
                color="error"
            />);
        case "NO-INICIADO":
            return (<ChipTable
                text="No iniciado"
                size="medium"
                icon="stop"
                color="info"
            />);
    };
}



export default function Elecciones() {

    const eleccionesLista = useSelector(store => store.elecciones);
    const agencias = useSelector(store => store.listas.agencias);
    const dialogRef = useRef();
    const navigate = useNavigate();
    const [cookies] = useCookies(['access-token']);
    const dispatch = useDispatch();
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    useEffect(() => {
        dispatch(actionGetAllElecciones(cookies['access-token']));
    }, []);

    const handleOpen = () => {
        dialogRef.current.openDialog();
    };

    const columnsElecciones = [
        { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
        {
            field: 'agencia', headerClassName: 'header-theme', headerName: 'Agencia', width: 150,
            renderCell: (params) => {
                const value = agencias.filter(r => r.id === params.row.idAgencia)
                return value[0].nombre;
            }
        },
        { field: 'nombre', headerClassName: 'header-theme', headerName: 'Nombre/Título', width: 250 },
        { field: 'dia', headerClassName: 'header-theme', headerName: 'Fecha', width: 100 },
        { field: 'hora', headerClassName: 'header-theme', headerName: 'Hora Inicio', width: 100 },
        {
            field: 'horaFin', headerClassName: 'header-theme', headerName: 'Hora Fin', width: 100,
            renderCell: (params) => {
                return addHours(params.row.hora, params.row.duracion)
            }
        },
        {
            field: 'estado', headerClassName: 'header-theme',
            headerName: 'Estado', width: 200,
            renderCell: renderNewCellValue
        },
        { field: 'duracion', headerClassName: 'header-theme', headerName: 'Duracion', width: 100 },
        { field: 'listas', headerClassName: 'header-theme', headerName: 'Listas', width: 100 },
        { field: 'sufragantes', headerClassName: 'header-theme', headerName: 'Sufragantes', width: 100 },
    ];

    const eliminarEleccion = (idEleccion, token = cookies['access-token']) => {
        dispatch(actionDeleteElecciones(idEleccion, token, setAlertMessage));
    }

    return (
        <Plantilla pagina='Elecciones'>
            <AlertaCustom alerta={alertMessage} />
            <Grid container >
                <Stack direction='row' justifyContent='flex-end' sx={{
                    width: '100%',
                    marginBottom: 5,
                    marginTop: 4,
                }}>
                    <Button
                        variant='contained'
                        endIcon={<AddIcon />}
                        onClick={() => navigate(PrivateRoutes.ELECCIONES_INGRESAR)}
                    >Crear eleccion</Button>
                </Stack>
                <DataGridTable
                    rows={eleccionesLista}
                    columns={columnsElecciones}
                    activeCheck={false}
                    eliminarDato={eliminarEleccion}
                    mensaje={'¿Esta seguro/a de eliminar la elección?'}
                    dialogRef={dialogRef}
                    handleOpen={handleOpen}
                    updateProcRoute={PrivateRoutes.ELECCIONES_MODIFICAR}
                />
            </Grid>
        </Plantilla>
    );
}

