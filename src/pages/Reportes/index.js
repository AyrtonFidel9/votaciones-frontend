import { Button, Grid, Stack } from '@mui/material';
import React from 'react';
import { DataGridTable, Plantilla } from '../../components';
import AddIcon from '@mui/icons-material/Add';
import { DescargarBtn } from './components';
import EditBtn from '../../components/DataGridTable/EditBtn';


export default function Reportes (){

    const columnsReportes = [
        { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
        { field: 'reporte', headerClassName: 'header-theme', headerName: 'Reporte', width: 150 },
        { field: 'opciones' , headerClassName: 'header-theme', headerName: 
            'Opciones', width: 200, 
            renderCell: (params) => {
                return [
                    <DescargarBtn
                    key={params.row.id*(Math.floor(Math.random() * (49-1)+1))}
                    
                />,
                <EditBtn
                    key={params.row.id*(Math.floor(Math.random() * (223-50)+50))}
                    row={params.row}
                />
            ];}
        },
    ];

    const rows = [
        {
            "id": 1,
            "reporte": "Reporte 1",
        },
        {
            "id": 2,
            "reporte": "Reporte 2",
        },
        {
            "id": 3,
            "reporte": "Reporte 3",
        },
        {
            "id": 4,
            "reporte": "Reporte 4",
        },
        {
            "id": 5,
            "reporte": "Reporte 5",
        },
    ]

    const Contenido = () => (
        <Grid container>
            <Stack direction='row' justifyContent='flex-end' sx={{
                width: '100%',
                marginBottom: 5,
                marginTop: 4,
            }}>
                <Button variant='contained'
                    endIcon={<AddIcon/>}
                >
                    Crear Reporte
                </Button>
            </Stack>
            <DataGridTable
                columns={columnsReportes}
                rows={rows}
                activeCheck={false}
            />
        </Grid>
    );

    return (
        <Plantilla Contenido={Contenido} pagina="Reportes"/>
    );
}