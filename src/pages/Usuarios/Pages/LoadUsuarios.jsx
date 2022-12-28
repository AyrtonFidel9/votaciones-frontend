import React, { useState } from "react";
import { Plantilla } from "../../../components";
import { Box, Button, Stack, TextField, FormControl, InputLabel } from "@mui/material";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from "react-redux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["CSV"];

const schema = yup.object({
    agencia: yup.number().typeError("Seleccione una agencia").required('Campo obligatorio'),
}).required();

export default function LoadUsuarios(){

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
    });

    const agencias = useSelector(store => store.listas.agencias);
    const navigate = useNavigate();
    const [ file, setFile ] = useState(null);
    
    const subirDatos = (data) => {
        if(file){
            data.file = file;
            console.log(data);
        }
    }

    return (
        <Plantilla pagina="Usuarios / Cargar Socios">
            <Box
                component='form'
                sx={{
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 10,
                    width: '65vw',
                    paddingTop: 2,
                }}
                noValidate={false}
                autoComplete="off"
                gap={2}
                onSubmit={handleSubmit(subirDatos)}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#ffffff',
                    borderRadius: 4,
                    padding: 4,
                    boxShadow: 3
                }} gap={4}>
                    <FormControl id="file"
                        error={errors.file && true}
                        sx={{
                            margin: '0 auto'
                        }}
                    >
                        <FileUploader
                            multiple={false}
                            handleChange={(file)=>{
                                console.log(file);
                                setFile(file);
                            }}
                            onTypeError={
                                (err)=>{
                                    setFile(null);
                                }
                            }
                            name="file"
                            label="Seleccionar archivo o arrastrar y soltar"
                            hoverTitle="Soltar el archivo"
                            types={fileTypes}
                            id="file"
                        />
                        <FormHelperText error={file === null} id="file"
                            >
                            {file === null && 'Campo obligatorio'}
                        </FormHelperText>
                    </FormControl>
                    <FormControl id="agencia"
                            error={errors.agencia && true}
                            sx={{
                                width: '50%',
                                margin: '0 auto'
                            }}
                        >
                            <InputLabel id="agencia">
                                Agencia
                            </InputLabel>
                            <Select
                                defaultValue={''}
                                labelId="agencia" 
                                id="agencia"
                                label="Agencia"
                                {...register('agencia', { required: true })}
                            >
                                {agencias.map(agencia => ( 
                                    <MenuItem key={agencia.id} value={agencia.id}>{agencia.nombre}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error={errors.agencia?.message && true} id="agencia"
                            >
                                {errors.agencia?.message}
                            </FormHelperText>
                    </FormControl>
                </Box>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    mt={3}
                >
                    <Button type='submit' variant="contained">Guardar</Button>
                    <Button variant="text" 
                        onClick={()=>navigate(PrivateRoutes.USUARIOS)}
                    >Regresar</Button>
                </Stack>
            </Box>
        </Plantilla>
    )
}