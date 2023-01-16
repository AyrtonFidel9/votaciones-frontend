import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AlertaCustom, Plantilla } from '../../components';
import { enviarToken, retornarBalance } from '../../services';
import { useCookies } from 'react-cookie';
import { actionGetAllUsuariosCuenta } from '../../redux/states/usuariosCuenta';

export default function Wallet(){

   const usuario = useSelector(store => store.usuario);
   const account = useSelector(store => store.account);
   const admins = useSelector(store => store.usuariosCuenta.filter(r => 
      r.cuentum.rol === 'ROLE_ADMIN'));
   const [cookies] = useCookies(['access-token']);
   const [balance, setBalance] = useState({});
   const dispatch = useDispatch();
   const [alertMessage, setAlertMessage] = useState({
      isView: false,
      titulo: '',
      content: '',
      count: 0,
      tipo: 'error',
      variante: '',
   });


   const getBalance = async (billetera) => {
      const bal = await retornarBalance(billetera, cookies['access-token']);
      if(bal.ok){
         const resp = await bal.json();
         setBalance(resp);
      }
   }

   useEffect(()=>{
      if(usuario.billeteraAddress !== null){
         getBalance(usuario.billeteraAddress);
         dispatch(actionGetAllUsuariosCuenta(cookies['access-token']));
      }
   },[cookies, usuario]);

   const recargarEther = async () => {
      
   }

   const recargarToken = async () => {
      let wallet = {};
      let sinFondos = 0;
      let sinTokens = 0;
      const fondosBasicos = 0.0008;

      if(balance.BNE > 0){
         setAlertMessage({isView: true, 
            titulo:"Error",
            content: "En su cuenta, como máxmimo solo puede tener 1 TOKEN ",
            count: ++alertMessage.count,
            tipo: 'error',
            variante: 'filled',
         });
         return;
      }

      for(let i = 0; i < admins.length; i++){
         const bal = await retornarBalance(
            admins[i].billeteraAddress, 
            cookies['access-token']);
         const resp = await bal.json();
         if(resp.ethers > fondosBasicos){
            if(resp.BNE > 0){
               const body = {
                  addressOwner: admins[i].billeteraAddress,
                  addressSocio: usuario.billeteraAddress,
               }
               const send = await enviarToken(body, cookies['access-token']);
               if(send.ok){
                  setAlertMessage({isView: true, 
                     titulo:"Proceso exitoso",
                     content: "El token se ha enviado a su billetera",
                     count: ++alertMessage.count,
                     tipo: 'success',
                     variante: 'filled',
                  });
               }
               //mirar si se crea una tabla con todas las transacciones historicas
               i = admins.length;
            }else{
               sinTokens++;
            }
         }else{
            sinFondos++;
         }
      }

      if(sinFondos === admins.length){
         setAlertMessage({isView: true, 
            titulo:"Error",
            content: "Las cuentas de los administradores están sin fondos",
            count: ++alertMessage.count,
            tipo: 'error',
            variante: 'filled',
         });
      }

      if(sinTokens === admins.length){
         setAlertMessage({isView: true, 
            titulo:"Error",
            content: "Las cuentas de los administradores están sin token",
            count: ++alertMessage.count,
            tipo: 'error',
            variante: 'filled',
         });
      }


   }

   return (
      <Plantilla pagina='Billetera'>
         <Box 
            sx={{
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            paddingTop: 3,
         }} gap={3}>
            <Box sx={{
               display: 'flex',
               flexDirection: 'column',
               background: 'rgba(255,255,255)',
               borderRadius: 4,
               boxShadow: 3,
               padding: 3,
               width: '45%',
            }} gap={4}>
               <Typography align='left'sx={{
                  fontSize: 20,
                  fontWeight: 'bold',
               }}>Token de votación</Typography>
               <Stack direction="row" justifyContent="center"
               alignItems="center"
               spacing={3}>
                  <img src={require('./assets/BNE.png')} alt='logo-token' width={100}/>
                  <Typography sx={{
                     fontSize: 40,
                     fontWeight: 'light'
                  }}>{balance.BNE} <strong>BNEs</strong></Typography>
               </Stack>
            </Box>
            <Box sx={{
               display: 'flex',
               flexDirection: 'column',
               backgroundColor: '#ffffff',
               borderRadius: 4,
               padding: 3,
               boxShadow: 3,
               width: '45%',
            }} gap={4}>
               <Typography align='left'sx={{
                  fontSize: 20,
                  fontWeight: 'bold',
               }}>Ethers</Typography>
               <Stack direction="row" justifyContent="center"
               alignItems="center"
               spacing={3}>
                  <img src={require('./assets/ether.png')} alt='logo-token' height={100}/>
                  <Typography sx={{
                     fontSize: 40,
                     fontWeight: 'light'
                  }}>{parseFloat(balance.ethers).toFixed(6)} <strong>ETH</strong></Typography>
               </Stack>
            </Box>
         </Box>
         <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            borderRadius: 4,
            padding: 3,
            boxShadow: 3,
            marginTop: 3,
         }} gap={4}>
            <Stack direction="row" justifyContent="center"
            alignItems="center"
            spacing={3}>
               {
                  account.rol === 'ROLE_SOCIO' && <>
                     <Button variant='contained' onClick={recargarToken}>Recargar token</Button>
                     <Button variant='contained' onClick={recargarEther}>Recargar ETHER</Button>
                  </>
               }
               {
                  account.rol === 'ROLE_JGE' &&
                  <Button variant='contained' onClick={recargarEther}>Recargar ETHER</Button>
               }
            </Stack>
         </Box>
         <AlertaCustom alerta={alertMessage}/>
      </Plantilla>
   );
} 