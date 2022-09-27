import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CardNotification from "./CardNotification";
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';


export default function NotificationsBtn (){
    const [anchorEl , setAnchorEl] = useState(null);
    const [numNotif, setNumNotif] = useState(2);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Notificaciones" arrow>
                <IconButton 
                    aria-label='notifications' 
                    size='medium'
                    onClick={handleClick}
                >
                    <Badge badgeContent={numNotif} color='error'>
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu 
                anchorEl={anchorEl} 
                id="notifications-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.17))',
                        mt: 1.5,
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 95,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                }}
            >
                <MenuItem>
                    <CardNotification contenido="Credenciales generadas con exito" color='success'/>
                </MenuItem>
                <MenuItem>
                    <CardNotification contenido="Credenciales generadas con exito DSAS" color='info'/>
                </MenuItem>
                <MenuItem>
                    <CardNotification contenido="Credenciales generadas con " color='warning'/>
                </MenuItem>
            </Menu>
        </>
    );
}