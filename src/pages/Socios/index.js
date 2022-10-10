import React from "react";
import { Button, Stack, Avatar, Grid } from "@mui/material";
import { Plantilla } from "../../components";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import { DataGridTable } from "../../components";
import jsonDataSocios from '../../__mocks__/socios.json';

export default function Socios () {

    const columnsSocios = [
        { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
        { field: 'imagen', headerClassName: 'header-theme', headerName: '', 
            width: 70,
            renderCell: (params) =>{
                return (
                    <Avatar alt={params.row.Nombre+" "+params.row.Apellido}
                        src={params.row.imagen}
                    />
                )
            }
        },
        { field: 'Nombre', headerClassName: 'header-theme', headerName: 'Nombres', width: 250 },
        { field: 'Apellido', headerClassName: 'header-theme', headerName: 'Apellidos', width: 100 },
        { field: 'Cedula', headerClassName: 'header-theme', headerName: 'Cedula', width: 100 },
    ]


    const Contenido = () => {
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
                    >Cargar datos</Button>
                    <Button
                        variant='contained'
                        endIcon={<AddIcon/>}
                    >Agregar nuevo socio</Button>
                </Stack>
                <DataGridTable 
                    columns={columnsSocios}
                    rows={jsonDataSocios}
                    activeCheck={false}
                />
            </Grid>
        );
    }

    return(
        <Plantilla Contenido={Contenido} pagina='Socios'/>
    );
}