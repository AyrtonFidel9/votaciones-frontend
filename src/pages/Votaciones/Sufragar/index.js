import { Button, Stack } from '@mui/material';
import React from 'react';
import { CarruselContent, Plantilla } from "../../../components";
import { Papeleta } from '../components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import SendIcon from '@mui/icons-material/Send';

export default function Sufragar (){

    const Listas = () => (
        <>
            <Papeleta nombreLista="Lista A"/>
            <Papeleta nombreLista="Lista B"/>
            <Papeleta nombreLista="Lista C"/>
            <Papeleta nombreLista="Lista D"/>
            <Papeleta nombreLista="Lista E"/>
        </>
    );

    const Contenido = () => (
        <>
            <Stack direction='row' spacing={2} justifyContent='flex-end' p={2}>
                <Button 
                    variant='contained'
                    color='secondary' 
                    endIcon={<PanoramaFishEyeIcon/>}
                >
                Votar en blanco</Button>
                <Button 
                    color='success'
                    variant='contained' 
                    endIcon={<SendIcon/>}
                    >
                Enviar voto</Button>
            </Stack>
            <CarruselContent Content={Listas}/>
        </>
    );

    return (
        <Plantilla Contenido={Contenido} pagina="Votaciones/Sufragar"/>
    );
}