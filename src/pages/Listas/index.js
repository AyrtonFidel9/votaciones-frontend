import { Avatar, Button, Grid, Stack } from "@mui/material";
import React from "react";
import { DataGridTable, Plantilla } from "../../components";
import AddIcon from '@mui/icons-material/Add';
import jsonListas from '../../__mocks__/listas.json';

const columnsListas = [
    { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 30 },
    { field: 'imagen', headerClassName: 'header-theme', headerName: '', 
        width: 70,
        renderCell: (params) =>{
            return (
                <Avatar alt={params.row.nombre+" "+params.row.representante}
                    
                />
            )
        }
    },
    { field: 'nombre', headerClassName: 'header-theme', headerName: 'Nombre', width: 150 },
    { field: 'representante', headerClassName: 'header-theme', headerName: 'Representante', width: 200 },
    { field: 'Psuplente', headerClassName: 'header-theme', headerName: '1er Suplente', width: 200 },
    { field: 'Ssuplente', headerClassName: 'header-theme', headerName: '2do Suplente', width: 200 },
    { field: 'eleccion', headerClassName: 'header-theme', headerName: 'Elección', width: 200 },
]

export default function Listas (){
    return(
        <Plantilla pagina="Listas">
            <Grid container>
                <Stack direction='row' justifyContent='flex-end' sx={{
                    width: '100%',
                    marginBottom: 5,
                    marginTop: 4,
                }}> 
                    <Button
                        variant='contained'
                        endIcon={<AddIcon/>}
                    >Crear Lista</Button>
                </Stack>
                <DataGridTable
                    rows={jsonListas}
                    columns={columnsListas}
                    activeCheck={false}
                />

            </Grid>
        </Plantilla>
    );
}