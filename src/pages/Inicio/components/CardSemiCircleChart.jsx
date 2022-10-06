import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import CircleIcon from '@mui/icons-material/Circle';

export default function CardSemiCircleChart ({ porcentaje, titulo, ancho, estado }){

    const Estado = () => {
        switch(estado){
            case 'progreso':
                return (
                    <Typography sx={{
                        display: 'flex',
                        paddingTop: 2,
                        alignItems: 'center',
                        fontSize: 14,
                        paddingBottom: 0
                    }}><CircleIcon sx={{
                        color:'#01A610',
                        display: 'flex',
                        paddingRight: 1,
                        fontSize: 20
                    }}/>En progreso</Typography>
                );
            case 'terminado':
                return (
                    <Typography sx={{
                        display: 'flex',
                        paddingTop: 2,
                        alignItems: 'center',
                        fontSize: 14
                    }}><CircleIcon sx={{
                        color:'#AD0000',
                        display: 'flex',
                        paddingRight: 1,
                        fontSize: 20
                    }}/>Terminado</Typography>
                );
        }
    }

    return (
        <Card elevation={4} sx={{
            width: `${ancho}px`,
            '.css-46bh2p-MuiCardContent-root:last-child':{
                paddingBottom: 2
            }
        }}>
            <CardContent>
                <Typography 
                    sx={{ fontSize: 18 }} 
                    color="text.primary" 
                    align='center'
                >
                    <b>Agencia: </b>{titulo}
                </Typography>
                <div style={{ fontSize: '25px', fontFamily: 'Arial'}}>
                    <SemiCircleProgressBar 
                        percentage={porcentaje}
                        showPercentValue
                        strokeWidth={30}
                        stroke='#4B9BFF'
                        
                    />
                </div>
                <Estado/>
            </CardContent>
        </Card>
    );
}
