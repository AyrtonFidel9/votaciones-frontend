import React from "react";
import { Grid, Stack } from "@mui/material";
import { Plantilla, DataGridTable } from "../../components";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

import jsonRowsAgencias from '../../__mocks__/agencias.json';

const columnsAgencias = [
    { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
    { field: 'nombre', headerClassName: 'header-theme', headerName: 'Nombre', width: 250 },
    { field: 'ubicacion', headerClassName: 'header-theme', headerName: 'Ubicación', width: 350 },
    { field: 'identificacion', headerClassName: 'header-theme', headerName: 'Identificacion', width: 200 },
]

export default function Agencias (){

    const Contenido = () => (
        <Grid container>
            <Stack direction='row' justifyContent='flex-end' sx={{
                width: '100%',
                marginBottom: 5,
                marginTop: 4,
            }}>
                <Button
                    variant='contained'
                    endIcon={<AddIcon/>}
                >Agregar Agencia</Button>
            </Stack>
            <DataGridTable
                rows={jsonRowsAgencias}
                columns={columnsAgencias}
                activeCheck={false}
            />
        </Grid>
    );

    return (
        <Plantilla Contenido={Contenido} pagina="Agencias"/>
    );
}