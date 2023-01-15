import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Plantilla } from '../../components';

export default function Wallet(){

   const account = useSelector(store => store.account);

   return (
      <Plantilla pagina='Billetera'>
         <Box 
         sx={{
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 10,
            width: '65vw',
            paddingTop: 5,
            backgroundColor: '#ffffff',
            borderRadius: 4,
            padding: 4,
            boxShadow: 3
         }}>
         
         </Box>
      </Plantilla>
   );
} 