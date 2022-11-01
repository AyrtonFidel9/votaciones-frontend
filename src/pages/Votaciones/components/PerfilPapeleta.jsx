import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Stack, Typography } from '@mui/material';

export default function PerfilPapeleta ({img, nombreCompleto}){
    return (
        <Stack direction="row" spacing={2} sx={{
            marginBottom: 2,
            marginTop: 2,
        }}>
            <Avatar alt={nombreCompleto} src={img} sx={{ width: 60, height: 60 }}/>
            <Typography variant='body1' sx={{
                placeSelf: 'center',
            }}>{nombreCompleto}</Typography>
        </Stack>
    );
}