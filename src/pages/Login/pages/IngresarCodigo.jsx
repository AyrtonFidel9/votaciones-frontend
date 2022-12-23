import React, {useState} from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { ReactComponent as MessageSend} from '../assets/message-send.svg';
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import { PrivateRoutes, PublicRoutes } from "../../../models";
import { actualizarEstadoCodigo, existSocioByPhone } from '../../../services';
import { AlertaCustom } from '../../../components';

const schema = yup.object({
    codigo: yup
        .string()
        .required('Campo obligatorio'),
}).required();

const MessageSendImg = styled(MessageSend)`
    margin: 0 auto;
    height: 200px;
`;

export default function IngresarCodigo () {
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

    const next = async (data) => {
        try {
            const update = await actualizarEstadoCodigo(data.codigo);
            if(update.ok)
                navigate(PrivateRoutes.REESTABLECER_PASS);
            else{
                const reason = await update.json();
                setAlertMessage({isView: true, 
                    titulo:"Error",
                    content: reason.message,
                    count: ++alertMessage.count,
                    tipo: 'error',
                    variante: 'filled',
                });  
            }

        } catch (error) {
            setAlertMessage({isView: true, 
                titulo:"No disponible",
                content: error,
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
            <MessageSendImg/>
            <Typography variant='body1' align="center">Ingrese el código enviado a su celular para continuar</Typography>
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
                <TextField {...register('codigo', {required: true})}
                    id="codigo"
                    error={errors.codigo && true}
                    label='Código'
                    variant='outlined'
                    helperText={errors.codigo?.message}
                />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color='secondary' sx={{
                        width: '50%',
                        margin: '0 auto',
                        fontWeight: 'bold',
                    }} onClick={()=>navigate(PublicRoutes.INGRESAR_NUMERO)}>
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