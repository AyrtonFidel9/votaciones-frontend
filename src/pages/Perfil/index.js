import { Box, Paper, TextField, Stack, Chip, Button, Typography } from "@mui/material";
import React from "react";
import { Plantilla } from "../../components";
import { NotificacionPerfil } from "./components";

export default function Perfil ({ habilitado }){
    return (
        <Plantilla pagina='Perfil'>
            <Paper sx={{marginTop: 3, display: 'flex', p: 3}}>
                <Box container direction="row"
                    sx={{textAlign: 'center'}}
                >
                    <img src={require("../../__mocks__/avatar2.jpg")} height={300}/>
                    <Stack direction='row' spacing={2} sx={{marginTop:2,}} alignItems='center' justifyContent='space-between'>
                        <Chip label={ habilitado ? 'Cuenta Habilitada':'Cuenta Deshabilitada'} color={ habilitado ? 'success':'error'} />
                        <Button variant='contained' color='inherit'>Editar</Button>
                    </Stack>
                </Box>
                <Box
                    component='form'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: 3,
                        gap: 2,
                        width: '80%',
                    }}
                >
                    <TextField label="Nombres" variant="outlined" />
                    <TextField label="Apellidos" variant="outlined" />
                    <TextField label="Cédula" variant="outlined" />
                    <TextField label="Email" variant="outlined" />
                    <TextField label="Tlf Celular" variant="outlined" />
                </Box>
            </Paper>
            <Typography sx={{marginTop: 3, marginBottom: 3,}} variant='h6'><b>Notificaciones</b></Typography>
            <Stack spacing={3} sx={{marginBottom: 7}}>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
            </Stack>
        </Plantilla>
    );
}