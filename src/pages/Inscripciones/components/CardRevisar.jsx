import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function CardRevisar({socio}){
    return (
        <Paper sx={{display: 'flex', flexDirection: 'row', width: 'fit-content', p: 2,
            alignItems: 'center'
        }}>
            <Typography variant='body1' sx={{paddingRight: 2}}><b>Socio: </b>{socio}</Typography>
            <Button color='secondary' variant='contained'
                endIcon={<BorderColorIcon/>}
            >
                Revisar
            </Button>
        </Paper>
    );
}