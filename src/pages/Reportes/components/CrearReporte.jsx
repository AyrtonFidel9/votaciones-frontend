import React, {useEffect, useState} from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DataTable, Plantilla } from '../../../components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';

const tablas = [
    'agencia',
    'socios',
    'elecciones',
];

const camposTable = [
    'nombre',
    'id',
    'foto',
    'campo 2'
]

const graficosList = [
    'Diagrama de barras',
    'Diagrama pastel',
    'Histograma',
    'otro'
]

export default function CrearReporte () {

    const Formulario = () => {

        const { register, handleSubmit, watch, control } = useForm();

        const [ entidades, setEntidades ] = useState([]);
        const [ campos, setCampos] = useState([]);
        const [ graficos, setGraficos ] = useState([]);
        
        const onSubmit = data => console.log(data);

        return (
            <>
                <Box
                    component='form'
                    sx={{
                        '& .MuiTextField-root': { m: 1, },
                        marginTop: 2,
                    }}
                    noValidate={false}
                    autoComplete="on"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Paper sx={{display: 'flex', flexWrap: 'wrap', p:2}}>
                        <Stack spacing={2} sx={{width: '50%'}}>
                            <TextField {...register('nombre')} 
                                id="nombre" 
                                label='Nombre del reporte' 
                                variant='outlined' />
                            <Controller
                            name='multiselect-campos'
                            control={control}
                            render={({ field: { value, ...otherOptions}}) => {
                                setTimeout(() => value && setCampos(value), 0);
                                return (
                                    <FormControl sx={{margin: '8px !important'}}>
                                        <InputLabel id='Campos' sx={{paddingRight: 4}}>Campos</InputLabel>
                                        <Select
                                            multiple
                                            id='Campos'
                                            label='Campos'
                                            value={value || []}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((valueSel) => (
                                                        <Chip key={valueSel} label={valueSel} />
                                                    ))}
                                                </Box>
                                                )
                                            )}
                                            {...otherOptions}
                                        >
                                            {camposTable.map((name)=>{
                                                return (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        <Checkbox checked={campos.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                );
                            }}
                        />
                        <Controller
                            name='multiselect-graficos'
                            control={control}
                            render={({ field: { value, ...otherOptions}}) => {
                                setTimeout(() => value && setGraficos(value), 0);
                                return (
                                    <FormControl sx={{ margin: '8px !important' }}>
                                        <InputLabel id='Graficos' sx={{paddingRight: 4}}>Gráficos</InputLabel>
                                        <Select
                                            multiple
                                            id='Graficos'
                                            label='Graficos'
                                            value={value || []}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((valueSel) => (
                                                        <Chip key={valueSel} label={valueSel} />
                                                    ))}
                                                </Box>
                                                )
                                            )}
                                            {...otherOptions}
                                        >
                                            {graficosList.map((name)=>{
                                                return (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        <Checkbox checked={graficos.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                );
                            }}
                        />
                        </Stack>
                        <Controller
                            name='multiselect-datos'
                            control={control}
                            render={({ field: { value, ...otherOptions}}) => {
                                setTimeout(() => value && setEntidades(value), 0);
                                return (
                                    <FormControl sx={{ m: 1, minWidth: '47%' }}>
                                        <InputLabel id='Datos'>Datos</InputLabel>
                                        <Select
                                            multiple
                                            id='Datos'
                                            label='Datos'
                                            value={value || []}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((valueSel) => (
                                                        <Chip key={valueSel} label={valueSel} />
                                                    ))}
                                                </Box>
                                                )
                                            )}
                                            
                                            {...otherOptions}
                                        >
                                            {tablas.map((name)=>{
                                                console.log(entidades);
                                                return (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        <Checkbox checked={entidades.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                );
                            }}
                        />
                    </Paper>
                    <Stack direction='row' spacing={2} sx={{paddingTop: 3, paddingBottom: 3,}} justifyContent='flex-end'>
                        <Button variant='contained' color='secondary'>Previsualizar</Button>
                        <Button type='submit' variant="contained"
                            endIcon={<AddIcon/>}
                        >Generar reporte</Button>
                    </Stack>
                </Box>
            </>
        );
    };

    const jsonData = require('../../../__mocks__/previsualizar.json');

    return (
        <Plantilla pagina="Reportes/Crear">
            <Formulario/>
            <DataTable content={jsonData}/>
        </Plantilla>
    );
}