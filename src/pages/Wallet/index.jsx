import { Box, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AlertaCustom, Plantilla } from '../../components';
import { enviarEther, enviarToken, retornarBalance } from '../../services';
import { useCookies } from 'react-cookie';
import { actionGetAllUsuariosCuenta } from '../../redux/states/usuariosCuenta';

export default function Wallet(){
   const fondosBasicos = 0.0008;
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

   const [habBtn, setHabBtn] = useState(false);
   const [habBtnToken, setHabBtnToken] = useState(false);

   const getBalance = async (billetera) => {
      const bal = await retornarBalance(billetera, cookies['access-token']);
      if(bal.ok){
         const resp = await bal.json();
         console.log(resp);
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

      let sinFondos = 0;

      if(balance.ethers > fondosBasicos){
         setAlertMessage({isView: true, 
            titulo:"Atención",
            content: "Los ethers asignados son suficientes",
            count: ++alertMessage.count,
            tipo: 'warning',
            variante: 'filled',
         });

         return;
      }

      setHabBtn(true);

      for(let i = 0; i < admins.length; i++){

         const bal = await retornarBalance(
            admins[i].billeteraAddress, 
            cookies['access-token']);

         if(bal.ok){
            const resp = await bal.json();
            if(resp.ethers > fondosBasicos){
               const body = {
                  addressOwner: admins[i].billeteraAddress,
                  addressSocio: usuario.billeteraAddress,
               }
               console.log(body);
               const send = await enviarEther(body, cookies['access-token']);
               if(send.ok){
                  setAlertMessage({isView: true, 
                     titulo:"Proceso exitoso",
                     content: "Se han agregado ethers a su billetera",
                     count: ++alertMessage.count,
                     tipo: 'success',
                     variante: 'filled',
                  });
                  setHabBtn(false);

               }else{
                  const msg = await send.json();
                  setAlertMessage({isView: true, 
                     titulo:"Error",
                     content: msg.message,
                     count: ++alertMessage.count,
                     tipo: 'error',
                     variante: 'filled',
                  });
                  setHabBtn(false);

               }
               //mirar si se crea una tabla con todas las transacciones historicas
               i = admins.length;
            }else{
               sinFondos++;
            }
         }
      }

      if(sinFondos === admins.length){
         setAlertMessage({isView: true, 
            titulo:"Atención",
            content: "Las cuentas de los administradores están sin fondos",
            count: ++alertMessage.count,
            tipo: 'warning',
            variante: 'filled',
         });
         setHabBtn(false);
      }

   }

   const recargarToken = async () => {
      let sinFondos = 0;
      let sinTokens = 0;

      if(balance.BNE > 0){
         setAlertMessage({isView: true, 
            titulo:"Atención",
            content: "En su cuenta, como máxmimo solo puede tener 1 TOKEN ",
            count: ++alertMessage.count,
            tipo: 'warning',
            variante: 'filled',
         });
         return;
      }
      setHabBtnToken(true);

      for(let i = 0; i < admins.length; i++){
         console.log(admins[i].billeteraAddress);
         const bal = await retornarBalance(
            admins[i].billeteraAddress, 
            cookies['access-token']);

         if(bal.ok){
            const resp = await bal.json();
            if(resp.ethers > fondosBasicos){
               setHabBtnToken(true);

               if(resp.BNE > 0){
                  const body = {
                     addressOwner: admins[i].billeteraAddress,
                     addressSocio: usuario.billeteraAddress,
                  }
                  console.log(body);
                  const send = await enviarToken(body, cookies['access-token']);
                  if(send.ok){
                     setAlertMessage({isView: true, 
                        titulo:"Proceso exitoso",
                        content: "El token se ha enviado a su billetera",
                        count: ++alertMessage.count,
                        tipo: 'success',
                        variante: 'filled',
                     });
                     setHabBtnToken(false);

                  }else{
                     const msg = await send.json();
                     setAlertMessage({isView: true, 
                        titulo:"Error",
                        content: msg.message,
                        count: ++alertMessage.count,
                        tipo: 'error',
                        variante: 'filled',
                     });
                     setHabBtnToken(false);

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
      }

      if(sinFondos === admins.length){
         setAlertMessage({isView: true, 
            titulo:"Atención",
            content: "Las cuentas de los administradores están sin fondos",
            count: ++alertMessage.count,
            tipo: 'warning',
            variante: 'filled',
         });
      }

      if(sinTokens === admins.length){
         setAlertMessage({isView: true, 
            titulo:"Atención",
            content: "Las cuentas de los administradores están sin token",
            count: ++alertMessage.count,
            tipo: 'warning',
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
                     <LoadingButton loading={habBtnToken} variant='contained' onClick={recargarToken}>Recargar token</LoadingButton>
                     <LoadingButton loading={habBtn} variant='contained' onClick={recargarEther}>Recargar ETHER</LoadingButton>
                  </>
               }
               {
                  account.rol === 'ROLE_JGE' &&
                  <LoadingButton variant='contained' onClick={recargarEther} 
                  loading={habBtn}
                  >Recargar ETHER</LoadingButton>
               }
            </Stack>
         </Box>
         <AlertaCustom alerta={alertMessage}/>
      </Plantilla>
   );
} 