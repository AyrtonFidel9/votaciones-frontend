import React, { Fragment, useEffect, useState, useMemo } from "react";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes";


/*const opciones = [
    {opcion: 'Inicio',icon: HomeIcon},
    {opcion: 'Socios', icon: PeopleAltIcon},
    {opcion: 'Agencias', icon: ApartmentIcon},
    {opcion: 'Elecciones', icon: DashboardIcon},
    {opcion: 'Votaciones', icon: DraftsIcon},
    {opcion: 'Reportes', icon: AssessmentIcon},
    {opcion: 'Inscripciones', icon: UploadFileIcon},
    {opcion: 'Listas', icon: RecentActorsIcon},
    {opcion: 'Perfil', icon: SettingsIcon}
];*/

const opcionesAdmin = [
    {opcion: 'Inicio',icon: HomeIcon, navegar: (evt)=>{
        console.log(evt);
    }},
    {opcion: 'Usuarios', icon: PeopleAltIcon},
    {opcion: 'Agencias', icon: ApartmentIcon},
    {opcion: 'Reportes', icon: AssessmentIcon},
    {opcion: 'Perfil', icon: SettingsIcon}
];

const opcionesJGE = [
    {opcion: 'Inicio',icon: HomeIcon},
    {opcion: 'Elecciones', icon: DashboardIcon},
    {opcion: 'Reportes', icon: AssessmentIcon},
    {opcion: 'Inscripciones', icon: UploadFileIcon},
    {opcion: 'Listas', icon: RecentActorsIcon},
    {opcion: 'Perfil', icon: SettingsIcon}
];

const opcionesVotante = [
    {opcion: 'Inicio',icon: HomeIcon},
    {opcion: 'Votaciones', icon: DraftsIcon},
    {opcion: 'Inscripciones', icon: UploadFileIcon},
    {opcion: 'Perfil', icon: SettingsIcon}
];

function NavBar(props){
    const { ancho, clickMenu, openNav } = props;

    const [ opciones, setOpciones ] = useState([]);

    const userRol = useSelector((store) => store.account.rol);

    const navigate = useNavigate();

    const definirOpciones  = () => {
        switch(userRol){
            case 'ROLE_ADMIN':
                setOpciones(opcionesAdmin);
                break;
            case 'ROLE_JGE':
                setOpciones(opcionesJGE);
                break;
            case 'ROLE_SOCIO':
                setOpciones(opcionesVotante);
                break;
            default:
                break;
        }
    };

    useMemo(definirOpciones, [userRol]);

    useEffect(()=>{
        definirOpciones();
    });
    
    const navWidth = openNav ? ancho : ancho/2;
    
    const navegar = (evt) => {
        switch(evt.target.id){
            case 'Inicio':
                navigate(PrivateRoutes.INICIO);
                break;
            case 'Usuarios':
                navigate(PrivateRoutes.USUARIOS);
                break;
            case 'Agencias':
                navigate(PrivateRoutes.AGENCIAS);
                break;
            case 'Elecciones':
                navigate(PrivateRoutes.ELECCIONES);
                break;
            case 'Votaciones':
                navigate(PrivateRoutes.VOTACIONES);
                break;
            case 'Reportes':
                navigate(PrivateRoutes.REPORTES);
                break;
            case 'Inscripciones':
                navigate(PrivateRoutes.INSCRIPCIONES);
                break;
            case 'Listas':
                navigate(PrivateRoutes.LISTAS);
                break;
            case 'Perfil':
                navigate(PrivateRoutes.PERFIL);
                break;
            default:
                break;
        }
    };

    return (
    <Collapse in={openNav} orientation="horizontal" collapsedSize={72} sx={{
        borderRadius: 4,
        borderBottomRightRadius: 14,
    }}>
        <Paper 
            elevation={2}
            sx={{
                bgcolor: '#363740',
                borderRadius: 4,
                width: `${navWidth}vw`,
                height: '97vh',
                overflow: 'auto'
            }}
        >
            <Stack key='stack-1' sx={{
                borderRadius: 4,
            }}>
                <Stack key='stack-2' direction='row' sx={{
                    padding: 1,
                    justifyContent: 'space-between'
                }}>
                    {openNav && 
                    <HowToVoteIcon key='icon-vote' sx={{
                        width: 50,
                        color: '#ffffff',
                        height: 50
                    }}/>}
                    <IconButton key='menu-icon' onClick={clickMenu}>
                        <MenuRoundedIcon sx={{
                        width: 40,
                        color: '#ffffff',
                        height: 40
                    }}/>
                    </IconButton>
                </Stack>
                <Divider key='divider-up' sx={{
                    borderColor: 'rgba(255, 255, 255, 0.20)'
                }}/>
                {opciones.map((op, index) => (
                    <Fragment key={index} >
                        {index === (opciones.length - 1) && <Divider key={"div-"+op.opcion} sx={{
                            borderColor: 'rgba(255, 255, 255, 0.20)'
                        }}/>}
                        <Button
                            id={op.opcion}
                            key={op.opcion}
                            sx={{
                                color: '#ffffff',
                                textTransform: 'capitalize',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                justifyContent: 'left',
                                height: 60
                            }}
                            
                            startIcon={<op.icon id={op.opcion} key={'icon-'+op.opcion}  sx={{
                                width: 60,
                                height: 25
                            }}/>}

                            onClick={navegar}
                        >
                            {openNav && op.opcion}
                        </Button>
                    </Fragment>
                ))}
            </Stack>
        </Paper>
    </Collapse>
    );
}

export default NavBar;
