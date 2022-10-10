import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import NotificationsBtn from './NotificationsBtn';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AvatarAppBar from './AvatarAppBar';
import Stack from '@mui/material/Stack';

export default function HeaderBar(props){

    const { paginaActual }  = props;

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
                <AvatarAppBar/>
            </Stack>
        </AppBar>
    );
}
