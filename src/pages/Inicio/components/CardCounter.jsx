import { Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CardCounter ({ cantidad, titulo, cantidadMaxima, altura }) {
    return (
        <Card elevation={4} sx={{
            height: `${altura}px`
        }}>
            <CardContent>
                <Stack spacing={3}>
                    <Typography 
                        sx={{ fontSize: 18, fontWeight: 'bold' }} 
                        color="text.primary" 
                        align='center'
                    >
                        {titulo}
                    </Typography>
                    <div style={{
                        width:`${altura*0.57}px`, 
                        placeSelf: 'center'
                    }}>
                        <CircularProgressbar 
                            value={cantidad} 
                            text={cantidad} 
                            maxValue={cantidadMaxima}/>
                    </div>
                </Stack>
            </CardContent>
        </Card>
    );
}