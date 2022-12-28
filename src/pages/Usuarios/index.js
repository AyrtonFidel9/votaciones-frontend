import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button, Stack, Avatar, Grid } from "@mui/material";
import { AlertaCustom, Plantilla } from "../../components";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import { DataGridTable } from "../../components";
import { deleteUsuario, getAllUsuarios } from "../../services";
import { useCookies } from 'react-cookie';
import { handleDeleteTable } from "../../utils";
import { useSelector } from "react-redux";
import ChipTable from "../../components/DataGridTable/ChipTable";
import { PrivateRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";


const renderStateUsuario = (params) => {
    const size = 'small';
    if(params.row.estado){
        return (<ChipTable
            text="Habilitado"
            size={size}
            icon="check"
            color="success"
        />);
    }else{
        return (<ChipTable
            text="Deshabilitado"
            size={size}
            icon="cancel"
            color="error"
        />);
    }
}

function Usuarios () {
    const [ cookies ] = useCookies(['access-token']);
    const [ usuariosData, setUsuariosData ] = useState([]);
    const idUsuarioRedux = useSelector(store => store.usuario.id);
    const agencias = useSelector(store => store.listas.agencias);
    const dialogRef = useRef();
    const navigate = useNavigate();

    const handleOpen = () => {
        dialogRef.current.openDialog();
    };
    
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    const usuarios = useCallback(async () => {
        const getUsuarios = await getAllUsuarios(cookies['access-token']);
        const data = await getUsuarios.json();
        const values = data.message;
        values.forEach((element)=> {
            const vAgencia = agencias.find( a => element.idAgencia === a.id);
            element.agencia = vAgencia.nombre; 
        });
        setUsuariosData(values);
    }, [agencias]);
    

    const eliminarUsuario = async (
        idUsuario, 
        token = cookies['access-token'], 
        idUsuarioR = idUsuarioRedux) => {
        // validar que no sea la cuenta que esta iniciada sesion
        if(idUsuarioR !== idUsuario){
            const borrar = await deleteUsuario(idUsuario, token);
            if(borrar.ok){
                const datoEliminado = await borrar.json();
                handleDeleteTable(idUsuario, usuariosData, setUsuariosData);
                setAlertMessage({isView: true, 
                    titulo: "Proceso exitoso",
                    content: datoEliminado.message,
                    count: ++alertMessage.count,
                    tipo: 'success',
                    variante: 'filled',
                });
            }
            else {
                const datoEliminado = await borrar.json();
                setAlertMessage({isView: true, 
                    titulo:"Error",
                    content: datoEliminado.message,
                    count: ++alertMessage.count,
                    tipo: 'error',
                    variante: 'filled',
                });
            }
        }else{
            setAlertMessage({isView: true, 
                titulo:"Error",
                content: "NO SE PUEDE BORRAR LOS DATOS CON LOS QUE INICIO SESIÓN",
                count: ++alertMessage.count,
                tipo: 'error',
                variante: 'filled',
            });
        }
    }

    useEffect(()=>{
        usuarios();
    }, [usuarios]);

    
    const columnsUsuarios = [
        { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
        { field: 'imagen', headerClassName: 'header-theme', headerName: '', 
            width: 70,
            renderCell: (params) =>{
                const img = params.row.imagen && params.row.imagen.split('/');
                const imagen = params.row.imagen ? 'http://localhost:8080/images/'+img[4] : '';
                return (
                    <Avatar alt={params.row.nombre+" "+params.row.apellido}
                        src={imagen}
                    />
                )
            }
        },
        { field: 'nombres', headerClassName: 'header-theme', headerName: 'Nombres', width: 200 },
        { field: 'apellidos', headerClassName: 'header-theme', headerName: 'Apellidos', width: 200 },
        { field: 'cedula', headerClassName: 'header-theme', headerName: 'Cedula', width: 150 },
        { field: 'celular', headerClassName: 'header-theme', headerName: 'Celular', width: 150 },
        { field: 'codigo', headerClassName: 'header-theme', headerName: 'Código', width: 100 },
        { field: 'email', headerClassName: 'header-theme', headerName: 'E-Mail', width: 150 },
        { field: 'estado', headerClassName: 'header-theme', headerName: 'Estado', width: 140, 
            renderCell: renderStateUsuario 
        },     
        { field: 'agencia', headerClassName: 'header-theme', headerName: 'Agencia', width: 150},
    ]


    const Contenido =  () => {
        return(
            <Grid container>
                <Stack direction='row' justifyContent='space-between' sx={{
                    width: '100%',
                    marginBottom: 5,
                    marginTop: 4,
                }}> 
                    <Button
                        variant='contained'
                        startIcon={<UploadFileIcon/>}
                        color='warning'
                        onClick={()=>navigate(PrivateRoutes.USUARIOS_CARGAR_SOCIOS)}
                    >Cargar datos</Button>
                    <Button
                        variant='contained'
                        endIcon={<AddIcon/>}
                        onClick={()=>navigate(PrivateRoutes.INGRESAR_USUARIOS)}
                    >Agregar nuevo usuario</Button>
                </Stack>
                <DataGridTable 
                    columns={columnsUsuarios}
                    rows={usuariosData}
                    activeCheck={false}
                    eliminarDato={eliminarUsuario}
                    mensaje={'¿Esta seguro/a de eliminar al usuario?'}
                    dialogRef={dialogRef}
                    handleOpen={handleOpen}
                    updateProcRoute={PrivateRoutes.MODIFICAR_USUARIOS}
                />
            </Grid>
        );
    };

    return (
        <Plantilla pagina='Usuarios'>
            <AlertaCustom alerta={alertMessage}/>
            <Contenido/>
        </Plantilla>
    );
}

export default Usuarios;