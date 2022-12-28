import React, { useEffect, useState, useCallback } from "react";
import { getCuentaBySocio, updateAllDataCuenta } from "../../../services";
import { useCookies } from 'react-cookie';
import { AlertaCustom, Plantilla } from "../../../components";
import { Box, Button, Stack, TextField, FormControl, InputLabel} from "@mui/material";
import { useForm } from 'react-hook-form';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText';
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const schema = yup.object({
    usuario: yup.string().required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio'),
    rol: yup.string().required('Campo obligatorio'),
}).required();

export default function CuentaForm () {

    const data = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [ cookies ] = useCookies(['access-token']);
    const [ account, setAccount ] = useState({
        usuario: '',
        password: '',
        rol: '',
    });
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            usuario: '',
            password: '',
            rol: '',
        }
    });

    const actualizarCuenta = async (form) => {
        const updated = await updateAllDataCuenta(
            data.state.id, 
            form, 
            cookies['access-token']
        );

        if(updated.ok){
            const resp = await updated.json();
            setAlertMessage({isView: true, 
                titulo:"Tarea completada satisfactoriamente",
                content: resp.message,
                count: ++alertMessage.count,
                tipo: 'success',
                variante: 'filled',
            });
        }else{
            const resp = await updated.json();
            setAlertMessage({isView: true, 
                titulo:"Error",
                content: resp.message,
                count: ++alertMessage.count,
                tipo: 'error',
                variante: 'filled',
            });
        }
    }

    const callCuentaData = useCallback(async () => {
        const cuenta = await getCuentaBySocio(data.state.id, cookies['access-token']);
        if(cuenta.ok){
            const resp = await cuenta.json();
            const userAccount = resp.message;
            setAccount({...account, 
                usuario: userAccount.usuario,
                password: userAccount.password,
                rol: userAccount.rol,
            });
        }else{
            console.error("NO SE PUEDE CONECTAR A LA API");
        }
    }, [reset]);

    useEffect(()=>{
        callCuentaData();
    }, [callCuentaData]);

    useEffect(()=>{
        reset({...account});
        //console.log(account);
    }, [account]);



    return (
        <Plantilla pagina='Usuarios / Cuenta'>
            <Box
                component='form'
                sx={{
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 10,
                    width: '40vw',
                    paddingTop: 6,
                }}
                noValidate={false}
                autoComplete="off"
                gap={2}
                onSubmit={handleSubmit(actualizarCuenta)}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#ffffff',
                    borderRadius: 4,
                    padding: 4,
                    boxShadow: 3
                }} gap={4}>
                    <TextField {...register('usuario', { required: true })}
                        value={account.usuario}
                        id="usuario"
                        error={errors.usuario && true}
                        label='Usuario'
                        variant='outlined'
                        onChange={(evt)=>setAccount((prev)=>({
                            ...prev,
                            usuario: evt.target.value
                        }))}
                        helperText={errors.usuario?.message}
                    />
                    <FormControl error={errors.password && true} variant='outlined'>
                        <InputLabel htmlFor="password">Contraseña</InputLabel>
                        <OutlinedInput {...register('password', {required: true})}
                            id="password"
                            label='Contraseña'
                            value={account.password}
                            error={errors.password && true}
                            type={showPassword ? 'text' : 'password'}
                            onChange={(evt)=>setAccount((prev)=>({
                                ...prev,
                                password: evt.target.value
                            }))}
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
                        <FormHelperText error={errors.password && true}>
                            {errors.password?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl id="rol"
                        error={errors.rol && true}
                    >
                        <InputLabel id="rol">
                            Rol
                        </InputLabel>
                        <Select
                            defaultValue={''}
                            value={account.rol}
                            labelId="rol"
                            id="rol"
                            label="Rol"
                            {...register('rol', {required: true})}
                            onChange={(evt)=>setAccount((prev)=>({
                                ...prev,
                                rol: evt.target.value
                            }))}
                        >
                            <MenuItem value="ROLE_ADMIN">Administrador</MenuItem>
                            <MenuItem value="ROLE_SOCIO">Socio</MenuItem>
                            <MenuItem value="ROLE_JGE">Miembro JGE</MenuItem>
                        </Select>
                        <FormHelperText error={errors.rol?.message && true} id="rol">
                            {errors.rol?.message}
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
                    <Button type='submit' variant="contained"
                        endIcon={<SaveIcon/>}
                    >Guardar</Button>
                    <Button variant="text" 
                        onClick={()=>navigate(PrivateRoutes.MODIFICAR_USUARIOS, {state: data.state})}
                    >Regresar</Button>
                </Stack>
            </Box>
            <AlertaCustom alerta={alertMessage}/>
        </Plantilla>
    );
}