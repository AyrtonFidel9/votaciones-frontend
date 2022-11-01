import { Typography } from "@mui/material";
import React from "react";
import { CarruselContent, Plantilla } from "../../components";
import { VoteCompletado, VoteJustificar, VotePendiente } from "./components";


export default function Votaciones (){

    const TarjetasPendientes = () => (
        <>
            <VotePendiente agencia="Riobamba"/>
            <VotePendiente agencia="Riobamba"/>
            <VotePendiente agencia="Riobamba"/>
            <VotePendiente agencia="Riobamba"/> 
        </>
    );

    const VotacionesCompletadas = () => (
        <>
            <VoteCompletado agencia="Alausí"/> 
            <VoteCompletado agencia="Alausí"/> 
            <VoteCompletado agencia="Alausí"/> 
            <VoteCompletado agencia="Alausí"/> 
            <VoteCompletado agencia="Alausí"/> 
        </>
    );
    
    const VotacionesNoCompletadas = () => (
        <>
            <VoteJustificar agencia="San Andrés"/>
            <VoteJustificar agencia="San Andrés"/>
            <VoteJustificar agencia="San Andrés"/>
            <VoteJustificar agencia="San Andrés"/>
            <VoteJustificar agencia="San Andrés"/>
        </>
    );

    const Contenido = () => (
        <>
            <Typography variant='h6' sx={{marginBottom: 3, marginTop: 3,}}>Votaciones pendientes</Typography>
            <CarruselContent Content={TarjetasPendientes}/>
            <Typography variant='h6' 
                sx={{marginBottom: 3, marginTop: 3,}}
            >Votaciones completadas</Typography>
            <CarruselContent Content={VotacionesCompletadas}/>
            <Typography variant='h6' 
                sx={{marginBottom: 3, marginTop: 3,}}
            >Votaciones no completadas</Typography>
            <CarruselContent Content={VotacionesNoCompletadas} />
            <div style={{height: '60px'}}></div>
        </>
    );

    return (
        <Plantilla Contenido={Contenido} pagina="Votaciones"/>
    );
}