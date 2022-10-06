import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HeaderBar, NavBar } from ".";
import { ContentLayout, ContentNav, ContentSystem, Layout } from "../styled-components";


export default function Plantilla ( {Contenido} ){

    const [ openNav, setOpenNav ] = useState(true);
    const [ anchoHeader, setAnchoHeader ] = useState(79); 

    // funcion cuando se hace click en el icono del menu
    const clickMenu = () => {
        setOpenNav( openNav ? false : true);
        setAnchoHeader(92);
    }

    // si el nav bar se abre o se cierra cambiara el tamaño
    useEffect(()=>{
        setAnchoHeader(openNav ? 79 : 92);
    },[openNav]);

    return (
        <Layout>
            <ContentNav>
                <NavBar ancho={18} 
                    clickMenu={clickMenu} 
                    openNav={openNav} 
                />
            </ContentNav>
            <ContentLayout>
                <HeaderBar paginaActual='Inicio'/>
                <ContentSystem>
                    <Contenido/>
                </ContentSystem>
            </ContentLayout>
        </Layout>
    );
}

/*
<Grid container spacing={2} sx={{
            width: '100vw'
        }}>
            <Grid item xs="auto">
                <NavBar ancho={18} 
                    clickMenu={clickMenu} 
                    openNav={openNav} 
                />
            </Grid>
            <Grid item sx={{
                width: `${anchoHeader}vw`,
            }}>
                <HeaderBar paginaActual='Inicio'/>
                <Contenido/>
            </Grid>
        </Grid>*/