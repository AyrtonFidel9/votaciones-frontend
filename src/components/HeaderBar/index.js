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
        <AppBar color='transparent' elevation={0}>
            <Container sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Toolbar>
                    <Typography sx={{
                        fontWeight: 'bold',
                    }}>
                        {paginaActual.toUpperCase()}
                    </Typography>
                </Toolbar>
                <Stack direction="row" spacing={2} sx={{
                    display: '-webkit-box'
                }}>
                    <NotificationsBtn/>
                    <AvatarAppBar/>
                </Stack>
            </Container>
        </AppBar>
    );
}
