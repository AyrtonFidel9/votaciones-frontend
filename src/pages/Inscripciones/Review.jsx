import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Plantilla } from '../../components';
import { TableInscriptions } from './components';
import { PrivateRoutes } from '../../routes';
import { renderStateInscripcion } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetAllInscripciones } from '../../redux/states/inscripciones';
import { useCookies } from 'react-cookie';
import { actionGetAllUsuariosCuenta } from '../../redux/states/usuariosCuenta';

export default function Inscripciones() {

   const usuarios = useSelector( store => store.usuariosCuenta );
   const inscripciones = useSelector( store => store.inscripciones);
   const dispatch = useDispatch();
   const [cookies] = useCookies(['access-token']);


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
      { field: 'socio', headerClassName: 'header-theme', headerName: 'Socio', width: 230,
         renderCell: (params)=>{
            const user = usuarios.filter( item => params.row.idSocio == item.id)[0];
            return `${user.nombres} ${user.apellidos}`;
         }
      },
   ]

   const reviewInscription = () => {

   }

   useEffect(()=>{
      dispatch(actionGetAllInscripciones(cookies['access-token']));
      dispatch(actionGetAllUsuariosCuenta(cookies['access-token']));
   },[dispatch, cookies]);

   useEffect(()=>{
      dispatch(actionGetAllUsuariosCuenta(cookies['access-token']));
   },[]);

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