import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";

export default function VoteCompletado({agencia, idEleccion, dia, eleccion}){

    const navigate = useNavigate();

    return(
        <Card sx={{ minWidth: 320, maxHeight: 250, position: 'relative', marginRight: 5 }}>
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
                image={require("../../../assets/ya-vote.jpg")}
                alt="imagen de voto pendiente"
            />
            <CardActions sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}>
                <Button 
                    color="warning" 
                    variant="contained" 
                    endIcon={<VisibilityIcon/>}
                    onClick={()=>navigate(PrivateRoutes.SOCIOS_VER_RESULTADOS, { state: {
                        agencia, idEleccion, dia, eleccion
                    }})}
                    >
                    Ver resultados
                </Button>
            </CardActions>
        </Card>
    );
}