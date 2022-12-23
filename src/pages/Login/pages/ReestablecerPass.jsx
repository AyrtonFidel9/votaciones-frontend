import React, {useState} from "react";
import {
    Box,
    Button,
    FormControl,
    Typography
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { ReactComponent as RebootPass } from '../assets/rebootPass.svg';
import styled from "styled-components";
import { PublicRoutes } from '../../../models';
import { AlertaCustom } from '../../../components';
import { useDispatch, useSelector } from "react-redux";
import { updateCuentaSocio } from "../../../services";

const schema = yup.object({
    newPass: yup.string().required('Campo obligatorio'),
    repeatNewPass: yup.string().required('Campo obligatorio'),
}).required();

const PassSvg = styled(RebootPass)`
    margin: 0 auto;
    height: 200px;
`;

export default function ReestablecerPass () {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [ocultarBoton, setOcultarBoton] = useState('none');
    const [ocultarBotonPass, setOcultarBotonPass] = useState('block');

    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    const [showPassword, setShowPassword] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const idSocio = useSelector((store)=>store.recovery.idSocio);


    const next = async (data) => {
        if(data.newPass === data.repeatNewPass)
        {
            const procUpdate = await updateCuentaSocio(idSocio, data.newPass);

            if(procUpdate.ok){
                const response = await procUpdate.json();
    
                setAlertMessage({isView: true, 
                    titulo:"Proceso exitoso",
                    content: response.message,
                    count: ++alertMessage.count,
                    tipo: 'success',
                    variante: 'filled',
                });

                setOcultarBotonPass('none');
                setOcultarBoton(ocultarBoton === 'none' ? 'block' : 'none')
            }
        }else{
            setAlertMessage({isView: true, 
                titulo:"Error",
                content: "Las contraseñas no coinciden",
                count: ++alertMessage.count,
                tipo: 'error',
                variante: 'filled',
            });
        }
    }

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            placeContent: 'center',
        }}>
            <AlertaCustom alerta={alertMessage}/>
            <Typography variant='h5' sx={{fontWeight: 'bold'}}>Recuperación de contraseña</Typography>
            <PassSvg/>
            <Typography variant='body1' align="center">Ingrese la nueva contraseña</Typography>
            <Box
                component='form'
                sx={{
                    '& .MuiTextField-root': { m: 1, },
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '26vw'
                }}
                noValidate={false}
                autoComplete="off"
                gap={2}
                onSubmit={handleSubmit(next)}
            >
                <FormControl error={errors.newPass&& true}  sx={{
                        margin: '8px',
                    }} >
                    <InputLabel htmlFor="newPass">Escribir la nueva Contraseña</InputLabel>
                    <OutlinedInput {...register('newPass')}
                        id="newPass"
                        error={errors.newPass && true}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Escribir la nueva Contraseña"
                    />
                    <FormHelperText error={errors.newPass && true}>
                        {errors.newPass?.message}
                    </FormHelperText>
                </FormControl>
                <FormControl error={errors.repeatNewPass&& true} sx={{
                        margin: '8px'
                    }}>
                    <InputLabel htmlFor="repeatNewPass">Repetir la nueva Contraseña</InputLabel>
                    <OutlinedInput {...register('repeatNewPass')}
                        id="repeatNewPass"
                        error={errors.repeatNewPass && true}
                        type={showPassword ? 'text' : 'password'}
                        label="Repetir la nueva Contraseña"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error={errors.repeatNewPass && true}>
                        {errors.repeatNewPass?.message}
                    </FormHelperText>
                </FormControl>
                <Button type='submit' variant="contained" sx={{
                    margin: '0 auto',
                    fontWeight: 'bold',
                    display: ocultarBotonPass
                }}>
                    Reestablecer Contraseña
                </Button>
                <Button color='secondary' variant="contained" sx={{
                    margin: '0 auto',
                    fontWeight: 'bold',
                    display: ocultarBoton
                }} onClick={()=>{
                    navigate(PublicRoutes.LOGIN);
                }}>
                    Regresar al inicio
                </Button>
            </Box>
        </Box>
    );
}