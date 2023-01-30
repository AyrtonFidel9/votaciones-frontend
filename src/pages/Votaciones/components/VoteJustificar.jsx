import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { PrivateRoutes } from "../../../routes";
import { useNavigate } from "react-router-dom";

export default function VoteJustificar({agencia, idEleccion}){

    const [enable, setEnable] = useState(false);
    const navigate = useNavigate();

    
    return(
        <Card sx={{ minWidth: 320, height: 250, position: 'relative', marginRight: 5 }}>
            <CardContent sx={{
                position: 'absolute',
                color: '#ffffff',
                fontWeight: 'bold',
                textShadow: '0 0 4px black',
            }}>
                <Typography 
                    variant='h6' 
                    sx={{fontWeight: 'bold',}}
                    >
                    Elección de representantes
                </Typography>
                <Typography 
                    variant='h6' 
                    sx={{fontWeight: 'bold',}}
                    >
                    Agencia {agencia}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                image={require("../../../assets/justificar.jpg")}
                alt="imagen de voto pendiente"
            />
            <CardActions sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}>
            {!enable && 
                <Button 
                    color="error" 
                    variant="contained" 
                    endIcon={<ReceiptIcon/>}
                    onClick={()=>navigate(PrivateRoutes.VOTACIONES_JUSTIFICAR, {state: {
                        idEleccion
                    }})}
                    >
                    Justificar
                </Button>

            }
            {enable && 
                <Button 
                    color="secondary" 
                    variant="contained" 
                    endIcon={<ReceiptIcon/>}
                    >
                    Revisar Justificación
                </Button>
            }
            </CardActions>
        </Card>
    );
}