import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Stack } from "@mui/material";
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


export default function NavBar (){
    return (
        <Box sx={{
            width: 238,
            height: '100vh',
        }}>
            <Paper 
                variant="outlined" 
                elevation={1}
                sx={{
                    bgcolor: '#363740'
                }}
            >
                <Stack>
                    <HowToVoteIcon fontSize='100px'/>
                    <Divider variant='middle'/>
                    {opciones.map((op, index) => (
                        <>
                            {index === (opciones.length - 1) && <Divider />}
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
                                variant="text"
                                startIcon={<op.icon sx={{
                                    width: 60,
                                    height: 25
                                }}/>}
                            >
                                {op.opcion}
                            </Button>
                        </>
                    ))}
                </Stack>
            </Paper>
        </Box>
    );
}