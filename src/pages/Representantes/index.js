import { Avatar, Button, Grid, Stack } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { DataGridTable, Plantilla, AlertaCustom } from "../../components";
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { PrivateRoutes } from "../../routes";
import { actionDeleteRepresentante, actionGetAllRepresentantes } from "../../redux/states/representantes";
import { actionGetAllElecciones } from "../../redux/states/elecciones";


export default function Representantes (){
    const representantesLista = useSelector( store => store.representantes );
    const elecciones = useSelector( store => store.elecciones );
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

    useEffect(()=>{
        dispatch(actionGetAllElecciones(cookies['access-token']));
        dispatch(actionGetAllRepresentantes(cookies['access-token']));
    },[dispatch]);

    const handleOpen = () => {
        dialogRef.current.openDialog();
    };

    const eliminarRepresentante = (idRepresentante, token = cookies['access-token']) => {
        const resp= dispatch(actionDeleteRepresentante(idRepresentante, token));
        resp.then( msg => {
            if(msg===true){
                setAlertMessage( prev => ({
                    isView: true,
                    titulo: "Proceso terminado satisfactoriamente",
                    content: "Representante eliminado con exito",
                    count: ++prev.count,
                    tipo: 'success',
                    variante: 'filled',
                }));
            }else{
                setAlertMessage && setAlertMessage(prev => ({
                    isView: true,
                    titulo: "Error",
                    content: msg,
                    count: ++prev.count,
                    tipo: 'error',
                    variante: 'filled',
                }));
            }
        });
    }

    const columnsRepresentantes = [
        { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 30 },
        { field: 'principal', headerClassName: 'header-theme', headerName: 'Principal', width: 150 },
        { field: 'psuplente', headerClassName: 'header-theme', headerName: '1er Suplente', width: 200 },
        { field: 'ssuplente', headerClassName: 'header-theme', headerName: '2do Suplente', width: 200 },
        { field: 'idElecciones', headerClassName: 'header-theme', headerName: 'Elección', width: 200,
            renderCell: (params) => {
                const eleccion = elecciones.filter( r => r.id === params.row.idElecciones);
                return eleccion[0].nombre;
            }
        },
        { field: 'idInscripcion', headerClassName: 'header-theme', headerName: 'Inscripcion', width: 200 },
    ];

    return(
        <Plantilla pagina="Representantes">
            <Grid container>
                <Stack direction='row' justifyContent='flex-end' sx={{
                    width: '100%',
                    marginBottom: 5,
                    marginTop: 4,
                }}> 
                    <Button
                        variant='contained'
                        endIcon={<AddIcon/>}
                        onClick={()=>navigate(PrivateRoutes.REPRESENTANTES_INGRESAR)}
                    >Crear Representante</Button>
                </Stack>
                <DataGridTable
                    rows={representantesLista}
                    columns={columnsRepresentantes}
                    activeCheck={false}
                    eliminarDato={eliminarRepresentante}
                    mensaje={'¿Esta seguro/a de eliminar el representante?'}
                    dialogRef={dialogRef}
                    handleOpen={handleOpen}
                    updateProcRoute={PrivateRoutes.REPRESENTANTES_MODIFICAR}
                />
            </Grid>
            <AlertaCustom alerta={alertMessage}/>
        </Plantilla>
    );
}