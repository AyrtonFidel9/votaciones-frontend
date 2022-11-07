import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function CardRevisado({socio}){
    return (
        <Paper sx={{display: 'flex', flexDirection: 'row', width: 'fit-content', p: 2,
            alignItems: 'center'
        }}>
            <Typography variant='body1' sx={{paddingRight: 2}}><b>Socio: </b>{socio}</Typography>
            <Button variant='contained'
                endIcon={<VisibilityIcon/>}
            >
                Ver
            </Button>
        </Paper>
    );
}