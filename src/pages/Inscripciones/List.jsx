import { Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { Plantilla } from '../../components';
import { CardRevisado, CardRevisar } from './components';
import AddIcon from '@mui/icons-material/Add';

export default function Inscripciones (){

    return (
        <Plantilla pagina="Inscripciones">
            <Stack justifyContent='flex-end' direction="row">
                <Button variant='contained' sx={{margin: 3}}
                    endIcon={<AddIcon/>}
                >Generar Inscripción</Button>
            </Stack>
            <Typography variant='h6'><b>Inscripciones por revisar</b></Typography>
            <Grid container gap={2} p={3}>
                <CardRevisar socio='Luis Alberto Gonzales'/>
                <CardRevisar socio='Luis Alberto Gonzales'/>
                <CardRevisar socio='Luis Alberto Gonzales'/>
                <CardRevisar socio='Luis Alberto Gonzales'/>
                <CardRevisar socio='Luis Alberto Gonzales'/>
            </Grid>
            <Typography variant='h6'><b>Inscripciones revisadas</b></Typography>
            <Grid container gap={2} p={3}>
                <CardRevisado socio='Luis Alberto Gonzales'/>
                <CardRevisado socio='Luis Alberto Gonzales'/>
                <CardRevisado socio='Luis Alberto Gonzales'/>
                <CardRevisado socio='Luis Alberto Gonzales'/>
                <CardRevisado socio='Luis Alberto Gonzales'/>
                <CardRevisado socio='Luis Alberto Gonzales'/>
                <CardRevisado socio='Luis Alberto Gonzales'/>
            </Grid>
        </Plantilla>
    );
}