import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const settings = ['Perfil', 'Inicio', 'Salir'];

export default function AvatarAppBar({ src, nombreCompleto }) {

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                    <MenuItem key={op} sx={{
                        minWidth: 150
                    }}>
                        <Typography>{op}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}