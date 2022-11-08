import { Button, Paper, Typography } from "@mui/material";
import React from "react";

export default function NotificacionPerfil ({contenido}){
    return (
        <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
            
        }}>
            <Typography  variant='body1'>{contenido}</Typography>
            <Button variant='contained'>Acción</Button>
        </Paper>
    );
}