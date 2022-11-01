import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react';
import PerfilPapeleta from './PerfilPapeleta';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

export default function Papeleta ({nombreLista, candidatos, imagen}){

    const [ color, setColor ] = useState(false);

    const handleColor = () => {
        setColor(!color);
    }

    return (
        <Card sx={{ minWidth: 300, marginBottom: 7, marginRight: 3,
            backgroundColor: color && '#BEFFBD'
        }}>
            <CardMedia
                component='img'
                height='100'
                image = {require('../../../assets/lista-image.jpg')}
                sx={{
                    width: 100,
                    margin: '10px auto 0px',
                }}
            />
            <CardContent sx={{
                paddingLeft: 3,
                paddingRight: 3,
            }}>
                <Typography variant='h5' align='center' sx={{
                    paddingBottom: 2,
                }}>{nombreLista}</Typography>
                <Typography variant='h6'>Representante</Typography>
                <PerfilPapeleta img={require("../../../assets/avatar1.jpg")} nombreCompleto='Jose Luis Gonzales Casano'/>
                <Typography variant='h6'>Primer Suplente</Typography>
                <PerfilPapeleta img={require("../../../assets/avatar2.jpg")} nombreCompleto='Maria Sofia Mirante Paz'/>
                <Typography variant='h6'>Segundo Suplente</Typography>
                <PerfilPapeleta img={require("../../../assets/avatar3.jpg")} nombreCompleto='Jose Hernesto Rosales Diaz'/>
            </CardContent>
            <CardActions sx={{
                marginBottom: 1
            }}>
                {!color && 
                <Button
                    variant='contained'
                    size='medium'
                    endIcon={<CheckCircleOutlineIcon/>}
                    sx={{
                        width: '93%',
                        margin: '0 auto'
                    }}
                    onClick={handleColor}
                >Seleccionar</Button>}
                {color && <Button
                    variant='contained'
                    size='medium'
                    color='warning'
                    endIcon={<CloseIcon/>}
                    sx={{
                        width: '93%',
                        margin: '0 auto'
                    }}
                    onClick={handleColor}
                >Anular</Button>}
            </CardActions>
        </Card>
    );
}

