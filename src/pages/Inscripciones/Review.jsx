import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Plantilla } from '../../components';
import { TableInscriptions } from './components';
import { PrivateRoutes } from '../../routes';
import { renderStateInscripcion } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetAllInscripciones } from '../../redux/states/inscripciones';
import { useCookies } from 'react-cookie';
import { actionGetAllElecciones } from '../../redux/states/elecciones';
import { actionGetAllUsuariosCuenta } from '../../redux/states/usuariosCuenta';

export default function Inscripciones() {

   const dispatch = useDispatch();
   const [cookies] = useCookies(['access-token']);

   useEffect(()=>{
      dispatch(actionGetAllInscripciones(cookies['access-token']));
      dispatch(actionGetAllElecciones(cookies['access-token']));
      dispatch(actionGetAllUsuariosCuenta(cookies['access-token']));
   },[dispatch, cookies]);

   const inscripciones = useSelector( store => store.inscripciones.map(item =>{
      const us = store.usuariosCuenta.find(a => a.id == item.idSocio);
      const elec = store.elecciones.find(a => a.id == item.idElecciones);
      return ({
         id: item.id,
         nombre: item.nombre,
         formulario: item.formulario,
         declaracion: item.declaracion,
         estado: item.estado,
         socio: `${us.nombres} ${us.apellidos}`,
         eleccion: elec?.nombre,
         idSocio: item.idSocio,
         idElecciones: item.idElecciones,
      })
   }));

   const columnsInscripciones = [
      { field: 'id', headerClassName: 'header-theme', headerName: 'Id', width: 70 },
      { field: 'nombre', headerClassName: 'header-theme', headerName: 'Nombre', width: 200 },
      { field: 'formulario', headerClassName: 'header-theme', headerName: 'Formulario', width: 200 },
      { field: 'declaracion', headerClassName: 'header-theme', headerName: 'Declaración', width: 150 },
      {
         field: 'estado', headerClassName: 'header-theme', headerName: 'Estado', width: 140,
         renderCell: (params)=>{
            return renderStateInscripcion(params.row.estado);
         }
      },
      { field: 'socio', headerClassName: 'header-theme', headerName: 'Socio', width: 230 },
      { field: 'eleccion', headerClassName: 'header-theme', headerName: 'Elección', width: 230 },
   ]

   const reviewInscription = () => {

   }

   

   return (
      <Plantilla pagina="Inscripciones">
         <Grid container>
            <TableInscriptions
               columns={columnsInscripciones}
               rows={inscripciones}
               activeCheck={false}
               reviewInscription={reviewInscription}
               reviewProcRoute={PrivateRoutes.INSCRIPCIONES_REVIEW}
            />
         </Grid>
      </Plantilla>
   );
}