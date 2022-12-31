import { Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { Plantilla } from '../../components';
import { TableInscriptions } from './components';
import AddIcon from '@mui/icons-material/Add';
import ChipTable from "../../components/DataGridTable/ChipTable";
import usuariosData from '../../__mocks__/socios.json';
import { PrivateRoutes } from '../../routes';


const renderStateInscripcion = (params) => {
   const size = 'small';
   if (params.row.estado) {
      return (<ChipTable
         text="Habilitado"
         size={size}
         icon="check"
         color="success"
      />);
   } else {
      return (<ChipTable
         text="Deshabilitado"
         size={size}
         icon="cancel"
         color="error"
      />);
   }
}

export default function Inscripciones() {

   const columnsInscripciones = [
      { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
      { field: 'nombres', headerClassName: 'header-theme', headerName: 'Nombres', width: 200 },
      { field: 'apellidos', headerClassName: 'header-theme', headerName: 'Apellidos', width: 200 },
      { field: 'cedula', headerClassName: 'header-theme', headerName: 'Cedula', width: 150 },
      { field: 'celular', headerClassName: 'header-theme', headerName: 'Celular', width: 150 },
      { field: 'codigo', headerClassName: 'header-theme', headerName: 'Código', width: 100 },
      { field: 'email', headerClassName: 'header-theme', headerName: 'E-Mail', width: 150 },
      {
         field: 'estado', headerClassName: 'header-theme', headerName: 'Estado', width: 140,
         renderCell: renderStateInscripcion
      },
      { field: 'agencia', headerClassName: 'header-theme', headerName: 'Agencia', width: 150 },
   ]

   const reviewInscription = () => {

   }

   return (
      <Plantilla pagina="Inscripciones">
         <Grid container>
            <TableInscriptions
               columns={columnsInscripciones}
               rows={usuariosData}
               activeCheck={false}
               reviewInscription={reviewInscription}
               reviewProcRoute={PrivateRoutes.INSCRIPCIONES_REVIEW}
            />
         </Grid>
      </Plantilla>
   );
}