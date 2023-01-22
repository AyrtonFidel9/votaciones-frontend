import React, { useRef, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { Plantilla, DataGridTable, AlertaCustom } from "../../components";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoutes } from "../../routes";
import { useCookies } from 'react-cookie';
import { eliminarAgencia } from "../../services";
import { updateListas } from "../../redux/states/listas";

const columnsAgencias = [
    { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
    { field: 'nombre', headerClassName: 'header-theme', headerName: 'Nombre', width: 200 },
    { field: 'ubicacion', headerClassName: 'header-theme', headerName: 'Ubicación', width: 330 },
    { field: 'numRepresentantes', headerClassName: 'header-theme', headerName: 'Representantes', width: 140 },
    { field: 'numGanadores', headerClassName: 'header-theme', headerName: 'Ganadores', width: 100 },
]

export default function Agencias (){

    const agencias = useSelector( store => store.listas.agencias);
    const navigate = useNavigate();
    const [ cookies ] = useCookies(['access-token']);
    const dialogRef = useRef();
    const dispatch = useDispatch();

    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    const handleOpen = () => {
        if(dialogRef.current !== null){
            dialogRef.current.openDialog();

        }else{
            window.location.reload(false);
        }
    };
    
    const deleteAgencia = async (idAgencia, token = cookies['access-token']) => {
        const borrar = await eliminarAgencia(idAgencia, token);
        if(borrar.ok){
            const datoEliminado = await borrar.json();
            setAlertMessage({isView: true, 
                titulo:"Tarea completada satisfactoriamente",
                content: datoEliminado.message,
                count: ++alertMessage.count,
                tipo: 'success',
                variante: 'filled',
            });
            dispatch(updateListas({
                agencias: agencias.filter( r => r.id !== idAgencia)
            }));
        }else{
            const datoEliminado = await borrar.json();
            setAlertMessage({isView: true, 
                titulo:"Error",
                content: datoEliminado.message,
                count: ++alertMessage.count,
                tipo: 'error',
                variante: 'filled',
            });
        }
    }

    return (
        <Plantilla pagina="Agencias">
            <AlertaCustom alerta={alertMessage}/>
            <Grid container>
                <Stack direction='row' justifyContent='flex-end' sx={{
                    width: '100%',
                    marginBottom: 5,
                    marginTop: 4,
                }}>
                    <Button
                        variant='contained'
                        endIcon={<AddIcon/>}
                        onClick={()=>navigate(PrivateRoutes.AGENCIA_INGRESAR)}
                    >Agregar Agencia</Button>
                </Stack>
                <DataGridTable
                    rows={agencias}
                    columns={columnsAgencias}
                    activeCheck={false}
                    eliminarDato={deleteAgencia}
                    mensaje={'¿Esta seguro/a de eliminar la agencia?'}
                    dialogRef={dialogRef}
                    handleOpen={handleOpen}
                    updateProcRoute={PrivateRoutes.AGENCIA_MODIFICAR}
                />
            </Grid>
        </Plantilla>
    );
}