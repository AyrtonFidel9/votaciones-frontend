import React from 'react';
import DataGridTable from '../components/DataGridTable';
import ChipTable from '../components/DataGridTable/ChipTable';
import Avatar from '@mui/material/Avatar';


export default {
    title: 'Tables/TablesData',
    component: DataGridTable
};

const jsonData = require('../mocks/agencias.json');

const columnsAgencias = [
    { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
    { field: 'nombre', headerClassName: 'header-theme', headerName: 'Nombre', width: 250 },
    { field: 'ubicacion', headerClassName: 'header-theme', headerName: 'Ubicación', width: 350 },
    { field: 'identificacion', headerClassName: 'header-theme', headerName: 'Identificacion', width: 200 },
]

const TemplateDGTable = (args) => <DataGridTable {...args} />;

export const DataGridTab = TemplateDGTable.bind({});
DataGridTab.args={
    rows: jsonData, 
    columns: columnsAgencias,
    activeCheck: false
}

const renderNewCellValue = (params) => {
    const newKey = params.row.id+params.row.agencia+Math.random(12);
    console.log(newKey);
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

const jsonDataElecciones = require('../mocks/elecciones.json');

export const DataGridTabStates = TemplateDGTable.bind({});
DataGridTabStates.args={
    rows: jsonDataElecciones,
    columns: columnsElecciones,
    activeCheck: false
}

const jsonDataSocios = require('../mocks/socios.json');

const columnsSocios = [
    { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
    { field: 'imagen', headerClassName: 'header-theme', headerName: '', 
        width: 70,
        renderCell: (params) =>{
            return (
                <Avatar alt={params.row.nombre+" "+params.row.apellido}
                    src={params.row.imagen}
                />
            )
        }
    },
    { field: 'Nombre', headerClassName: 'header-theme', headerName: 'Nombres', width: 250 },
    { field: 'Apellido', headerClassName: 'header-theme', headerName: 'Apellidos', width: 100 },
    { field: 'Cedula', headerClassName: 'header-theme', headerName: 'Cedula', width: 100 },
]

export const DataGrdiTabImages = TemplateDGTable.bind({});
DataGrdiTabImages.args={
    rows: jsonDataSocios,
    columns: columnsSocios,
    activeCheck: false,
}


