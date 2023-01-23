import React, {useState} from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { ReactComponent as PhoneCall} from '../assets/PhoneCall.svg';
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import { PrivateRoutes, PublicRoutes } from '../../../routes';
import { existUsuarioByPhone } from '../../../services';
import { AlertaCustom } from '../../../components';
import { useDispatch } from "react-redux";
import { createRecovery } from "../../../redux/states/recovery";
import { enviarCodigo } from "../../../services"; 

const schema = yup.object({
    numero: yup
        .string()
        .matches(/^[0-9]{10}$/, 'El número debe contener 10 dígitos')
        .required('Campo obligatorio'),
}).required();

const PhoneImg = styled(PhoneCall)`
    margin: 0 auto;
    height: 300px;
`;

export default function IngresarNumero () {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const next = async (data) => {
        const search = await existUsuarioByPhone(data.numero);
        const resp = await search.json();
        if(search.ok){
            if(resp.message){
                //servicio para generar codigo
                await enviarCodigo(data.numero);
                navigate(PrivateRoutes.INGRESAR_CODIGO);
                dispatch(createRecovery({
                    habilitado: resp.message.existe,
                    numero: data.numero,
                    idUsuario: resp.message.idSocio
                }));
            }
        }
        else{
            setAlertMessage({isView: true, 
                titulo:"No disponible",
                content: resp.message,
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
            <PhoneImg/>
            <Typography variant='body1' align="center">Ingrese su número de celular, para recuperar su contraseña</Typography>
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
                autoComplete="on"
                gap={2}
                onSubmit={handleSubmit(next)}
            >
                <TextField {...register('numero', {required: true})}
                    id="numero"
                    error={errors.numero && true}
                    label='Número'
                    variant='outlined'
                    helperText={errors.numero?.message}
                />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color='secondary' sx={{
                        width: '50%',
                        margin: '0 auto',
                        fontWeight: 'bold',
                    }} onClick={()=>navigate(PublicRoutes.LOGIN)}>
                        Regresar
                    </Button>
                    <Button type='submit' variant="contained" sx={{
                        width: '50%',
                        margin: '0 auto',
                        fontWeight: 'bold',
                    }}>
                        Siguiente
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}