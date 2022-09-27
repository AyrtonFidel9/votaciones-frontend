import React from "react";
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';

export default function CardNotification(props){

    const { contenido, color } = props;

    const colorBorder = {
        success: '#4caf50',
        warning: '#fdd835',
        info: '#0277bd',
        error: '#b71c1c',
    }

    const iconCard = {
        success: CheckCircleIcon,
        warning: WarningIcon,
        info: InfoIcon,
        error: ErrorIcon,
    }

    const CardIcon = iconCard[color];

    return (
        <Paper elevation={0} variant="outlined" sx={{
            display: 'flex',
            borderLeftWidth: '5px',
            height: '65px',
            justifyContent: 'start',
            alignItems: 'center',
            borderLeftColor: `${colorBorder[color]}`,
            paddingLeft: '10px',
            paddingRight: '15px'
        }}>
            <CardIcon color={color}/>
            <Typography sx={{
                paddingLeft: '10px'
            }}>
                {contenido}
            </Typography>
        </Paper>
    );
}