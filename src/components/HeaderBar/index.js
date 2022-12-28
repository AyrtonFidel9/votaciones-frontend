import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import NotificationsBtn from './NotificationsBtn';
import AvatarAppBar from './AvatarAppBar';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';


export default function HeaderBar(props){

    const { paginaActual }  = props;
    const usuario = useSelector( store => store.usuario);
    const [ img, setImg] =  useState('');
    useEffect(()=>{
        if(usuario){
            if(usuario.imagen === null){
                setImg('imagen');
            }
            else{
                const img = usuario.imagen.toString().includes('/') ? usuario.imagen.split('/')[4] : usuario.imagen;
                setImg(img);
            }
        }
    },[usuario]);

    return (
        <AppBar color='transparent' elevation={0} sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '46px',
            paddingTop: '10px',
        }}>
            <Typography sx={{
                fontWeight: 'bold',
                display: 'flex',
                placeSelf: 'center',
            }}>
                {paginaActual.toUpperCase()}
            </Typography>
            <Stack direction="row" spacing={2} sx={{
                display: '-webkit-box',
                paddingRight: '36px',
            }}>
                <NotificationsBtn/>
                <AvatarAppBar src={usuario.imagen ? `http://localhost:8080/images/${img}` : require("../../assets/user.png")}/>
            </Stack>
        </AppBar>
    );
}
