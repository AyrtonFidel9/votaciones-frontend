import { Button, Grid, Stack } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { DataGridTable, Plantilla, AlertaCustom } from "../../components";
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { PrivateRoutes } from "../../routes";
import { actionDeleteRepresentante, actionGetAllRepresentantes } from "../../redux/states/representantes";
import { actionGetAllElecciones } from "../../redux/states/elecciones";
import { actionGetAllUsuariosCuenta } from "../../redux/states/usuariosCuenta";
import { actionGetAllInscripciones } from "../../redux/states/inscripciones";


export default function Representantes (){
    const dispatch = useDispatch();
    const [ cookies ] = useCookies(['access-token']);

    
    const inscripciones = useSelector(store=>store.inscripciones);
    const elecciones = useSelector( store => store.elecciones );
    const representantes = useSelector( store => { 
        return store.representantes
    });
    const [ representantesLista, setRepresentantesLista] = useState([]);

    const navigate = useNavigate();
    const dialogRef = useRef();
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    const cargarRepresentantes = () => {
        setRepresentantesLista(representantes.map(item=>{
            const ins = inscripciones.find( r => r.id === item.idInscripcion);
            const eleccion = elecciones.filter( r => r.id === item.idElecciones)[0];
            return ({
                id: item.id,
                principal: item.principal,
                psuplente: item.psuplente,
                ssuplente: item.ssuplente,
                idElecciones: item.idElecciones,
                eleccion: eleccion.nombre,
                idInscripcion: item.idInscripcion,
                inscripcion: ins.nombre,
            });
        }));
    }
    const handleOpen = () => {
        dialogRef.current.openDialog();
    };
    
    useEffect(()=>{
        dispatch(actionGetAllInscripciones(cookies['access-token']));
        dispatch(actionGetAllElecciones(cookies['access-token']));
        dispatch(actionGetAllRepresentantes(cookies['access-token']));
        dispatch(actionGetAllUsuariosCuenta(cookies['access-token']));
        cargarRepresentantes();
    },[dispatch]);

    const eliminarRepresentante = (idRepresentante, token = cookies['access-token']) => {
        const resp = dispatch(actionDeleteRepresentante(idRepresentante, token));
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
                setAlertMessage(prev => ({
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
        // { field: 'idElecciones', headerClassName: 'header-theme', headerName: 'Elección', width: 200,
        //     renderCell: (params) => {
        //         const eleccion = elecciones.filter( r => r.id === params.row.idElecciones);
        //         return eleccion[0].nombre;
        //     }
        // },
        { field: 'eleccion', headerClassName: 'header-theme', headerName: 'Elección', width: 200,},
        { field: 'inscripcion', headerClassName: 'header-theme', headerName: 'Inscripción', width: 200,},
        // { field: 'idInscripcion', headerClassName: 'header-theme', headerName: 'Inscripción', width: 300, 
        //     renderCell: (params) => {
        //         const ins= inscripciones.filter( r => r.id === params.row.idInscripcion);
        //         return ins[0].nombre;
        //     }
        // },
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