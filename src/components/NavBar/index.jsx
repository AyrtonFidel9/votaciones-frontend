import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { IconButton, Stack } from "@mui/material";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DraftsIcon from '@mui/icons-material/Drafts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Collapse from '@mui/material/Collapse';


const opciones = [
    {opcion: 'Inicio',icon: HomeIcon},
    {opcion: 'Socios', icon: PeopleAltIcon},
    {opcion: 'Agencias', icon: ApartmentIcon},
    {opcion: 'Elecciones', icon: DashboardIcon},
    {opcion: 'Votaciones', icon: DraftsIcon},
    {opcion: 'Reportes', icon: AssessmentIcon},
    {opcion: 'Inscripciones', icon: UploadFileIcon},
    {opcion: 'Listas', icon: RecentActorsIcon},
    {opcion: 'Perfil', icon: SettingsIcon}
];


export default function NavBar (props){

    const { ancho, clickMenu, openNav, anchoHeader, setAnchoHeader } = props;

    const navWidth = openNav ? ancho : ancho/2;

    return (
    <Collapse in={openNav} orientation="horizontal" collapsedSize={72} sx={{
        borderRadius: 4,
        borderBottomRightRadius: 14,
    }}>
        <Paper 
            variant="outlined" 
            elevation={1}
            sx={{
                bgcolor: '#363740',
                borderRadius: 4,
                width: `${navWidth}vw`,
            }}
        >
            <Stack sx={{
                borderRadius: 4,
            }}>
                <Stack direction='row' sx={{
                    padding: 1,
                    justifyContent: 'space-between'
                }}>
                    {openNav && 
                    <HowToVoteIcon sx={{
                        width: 50,
                        color: '#ffffff',
                        height: 50
                    }}/>}
                    <IconButton onClick={clickMenu}>
                        <MenuRoundedIcon sx={{
                        width: 40,
                        color: '#ffffff',
                        height: 40
                    }}/>
                    </IconButton>
                </Stack>
                <Divider sx={{
                    borderColor: 'rgba(255, 255, 255, 0.20)'
                }}/>
                {opciones.map((op, index) => (
                    <>
                        {index === (opciones.length - 1) && <Divider sx={{
                            borderColor: 'rgba(255, 255, 255, 0.20)'
                        }}/>}
                        <Button
                            key={op.opcion}
                            sx={{
                                color: '#ffffff',
                                textTransform: 'capitalize',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                justifyContent: 'left',
                                height: 60
                            }}
                            
                            startIcon={<op.icon sx={{
                                width: 60,
                                height: 25
                            }}/>}
                        >
                            {openNav && op.opcion}
                        </Button>
                    </>
                ))}
            </Stack>
        </Paper>
    </Collapse>
    );
}