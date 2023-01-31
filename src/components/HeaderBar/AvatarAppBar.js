import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes";
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
import { resetAccount } from "../../redux/states/cuenta";
import { resetListas } from "../../redux/states/listas";
import { resetUsuario } from "../../redux/states/usuario";
import { resetRepresentantes } from "../../redux/states/representantes";
import { resetElecciones } from "../../redux/states/elecciones";
import { resetUsuariosCuenta } from "../../redux/states/usuariosCuenta";
import { resetUsuariosList } from "../../redux/states/usuariosList";
import { persistor } from "../../redux/store";
import { resetInscripciones } from "../../redux/states/inscripciones";
import { resetAgencia } from "../../redux/states/agencia";
import { resetJustificaciones } from "../../redux/states/justificaciones";

export default function AvatarAppBar({ src, nombreCompleto }) {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [ , , removeCookie ] = useCookies(['access-token']);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = [
        {name: 'Perfil', action: ()=>{
            navigate(PrivateRoutes.PERFIL);
        }}, 
        {name: 'Inicio', action: ()=>{
            navigate(PrivateRoutes.INICIO)
        }}, 
        {name: 'Salir', action: ()=>{   
            removeCookie('access-token', {
                path: '/',
            });
            dispatch(resetAccount());
            dispatch(resetListas());
            dispatch(resetUsuario());
            dispatch(resetRepresentantes());
            dispatch(resetElecciones());
            dispatch(resetUsuariosCuenta());
            dispatch(resetUsuariosList());
            dispatch(resetInscripciones());
            dispatch(resetAgencia());
            dispatch(resetJustificaciones());
            persistor.purge();
        }}
    ];

    return (
        <>
            <Tooltip title='Abrir opciones' arrow>
                <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt={nombreCompleto} src={src} size='large'
                        sx={{ width: 42, height: 42 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-user-appbar"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map(op => (
                    <MenuItem key={op.name} sx={{
                        minWidth: 150
                    }} onClick={op.action}>
                        <Typography>{op.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}