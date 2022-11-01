import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function VotePendiente({agencia}){
    return(
        <Card sx={{ minWidth: 320, position: 'relative', marginRight: 5 }}>
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
                image={require("../../../assets/no-vote.jpg")}
                alt="imagen de voto pendiente"
            />
            <CardActions sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}>
                <Button 
                    color="primary" 
                    variant="contained" 
                    endIcon={<ArrowForwardIosIcon/>}
                    sx={{
                        width: 160
                    }}
                    >
                    Sufragar
                </Button>
            </CardActions>
        </Card>
    );
}