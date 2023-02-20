import React, { useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import { Box, Button, Stack, FormControl, InputLabel } from "@mui/material";
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
import { cargaMasiva } from "../../../services";
import { useCookies } from "react-cookie";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const fileTypes = ["CSV"];

const schema = yup.object({
    idAgencia: yup.number().typeError("Seleccione una agencia").required('Campo obligatorio'),
}).required();

export default function LoadUsuarios(){
    const [habBtn, setHabBtn] = useState(false);
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
    const [cookies] = useCookies(['access-token']);
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    const subirDatos = async (data) => {
        if(file){
            setHabBtn(true);
            data.datos = file;
            console.log(data);
            const resp = await cargaMasiva(data, cookies['access-token']);
            console.log(resp);
            if(resp.ok){
                setAlertMessage({
                    isView: true, 
                    titulo:"Proceso exitoso",
                    content: "Usuarios ingresados con exito",
                    count: ++alertMessage.count,
                    tipo: 'success',
                    variante: 'filled',
                });
                setHabBtn(false);

            }else{
                const dat = await resp.json();
                console.log(dat);
                setAlertMessage({
                    isView: true, 
                    titulo:"Error",
                    content: "Ha ocurrido un error al ingresar los usuarios, intentelo de nuevo",
                    count: ++alertMessage.count,
                    tipo: 'error',
                    variante: 'filled',
                });
                setHabBtn(false);

            }
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
                    <FormControl id="idAgencia"
                            error={errors.idAgencia && true}
                            sx={{
                                width: '50%',
                                margin: '0 auto'
                            }}
                        >
                            <InputLabel id="idAgencia">
                                Agencia
                            </InputLabel>
                            <Select
                                defaultValue={''}
                                labelId="idAgencia" 
                                id="idAgencia"
                                label="Agencia"
                                {...register('idAgencia', { required: true })}
                            >
                                {agencias.map(agencia => ( 
                                    <MenuItem key={agencia.id} value={agencia.id}>{agencia.nombre}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error={errors.idAgencia?.message && true} id="idAgencia"
                            >
                                {errors.idAgencia?.message}
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
                    <LoadingButton 
                        type='submit' 
                        variant="contained" 
                        loading={habBtn}
                        loadingPosition="end"
                        endIcon={<SaveIcon/>}
                        >
                        <span>Guardar</span>
                    </LoadingButton>                        
                    <Button variant="text" disabled={habBtn}
                        onClick={()=>navigate(PrivateRoutes.USUARIOS)}
                    >Regresar</Button>
                </Stack>
            </Box>
            <AlertaCustom alerta={alertMessage}/>
        </Plantilla>
    )
}