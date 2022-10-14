import React from "react";
import { Grid, Stack } from "@mui/material";
import { DataGridTable, Plantilla } from "../../components";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import ChipTable from "../../components/DataGridTable/ChipTable";


import jsonElecciones from '../../__mocks__/elecciones.json';



const renderNewCellValue = (params) => {
    
    const newKey = params.row.id+params.row.agencia+Math.random(12);

    switch(params.row.estado){
        case "en curso":
            return (<ChipTable
                key={newKey}
                text="En curso"
                size="medium"
                icon="live"
                color="success"
            />);
        case "exitoso":
            return (<ChipTable
                key={newKey} 
                text="Exitosa"
                size="medium"
                icon="check"
                color="success"
            />);
        case "nulidad":
            return (<ChipTable
                key={newKey}
                text="Nulidad"
                size="medium"
                icon="error"
                color="error"
            />);
        case "impugnado":
            return (<ChipTable 
                key={newKey}
                text="Impugnado"
                size="medium"
                icon="error"
                color="error"
            />);
    };
}

const columnsElecciones = [
    { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
    { field: 'agencia', headerClassName: 'header-theme', headerName: 'Agencia', width: 150 },
    { field: 'nombre', headerClassName: 'header-theme', headerName: 'Nombre/Título', width: 250 },
    { field: 'fecha', headerClassName: 'header-theme', headerName: 'Fecha', width: 100 },
    { field: 'horaInicio', headerClassName: 'header-theme', headerName: 'Hora Inicio', width: 100 },
    { field: 'horaFin', headerClassName: 'header-theme', headerName: 'Hora Fin', width: 100 },
    { field: 'estado', headerClassName: 'header-theme', 
        headerName: 'Estado', width: 200,
        renderCell: renderNewCellValue
    },
    { field: 'duracion', headerClassName: 'header-theme', headerName: 'Duracion', width: 100 },
    { field: 'listas', headerClassName: 'header-theme', headerName: 'Listas', width: 100 },
    { field: 'sufragantes', headerClassName: 'header-theme', headerName: 'Sufragantes', width: 100 },
]


export default function Elecciones (){
    

    const Contenido = () => (
        <Grid container >
            <Stack direction='row' justifyContent='flex-end' sx={{
                width: '100%',
                marginBottom: 5,
                marginTop: 4,
            }}> 
                <Button
                    variant='contained'
                    endIcon={<AddIcon/>}
                >Crear eleccion</Button>
            </Stack>
            <DataGridTable
                rows={jsonElecciones}
                columns={columnsElecciones}
                activeCheck={false}
            />
        </Grid>
    );

    return (
        <Plantilla Contenido={Contenido} pagina='Elecciones'/>
    );
}

