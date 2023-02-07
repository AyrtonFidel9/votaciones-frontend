import React, { useEffect, useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import { Box, Button, Stack, TextField, FormControl, InputLabel } from "@mui/material";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FormHelperText from '@mui/material/FormHelperText';
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useSelector } from "react-redux";
import { actualizarUsuario, ingresarUsuario } from "../../../services";
import { useCookies } from 'react-cookie';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const schema = yup.object({
    nombres: yup.string().required('Campo obligatorio'),
    apellidos: yup.string().required('Campo obligatorio'),
    cedula: yup.string().required('Campo obligatorio'),
    codigo: yup.string().required('Campo obligatorio'),
    imagen: yup.mixed().test("imagen", "Campo obligatorio", (value) => {
        try{
            //console.log(value);
        }catch(err){
            console.log(err);
        }
        return value && value.length > 0;
    }),
    estado: yup.boolean().required('Campo obligatorio'),
    email: yup.string().required('Campo obligatorio'),
    celular: yup.string().required('Campo obligatorio'),
    agencia: yup.number().typeError("Seleccione una agencia").required('Campo obligatorio'),
}).required();

export default function UsuariosForm () {
    const data = useLocation();
    let img = '';
    const [habBtn, setHabBtn] = useState(true);
    if(data.state){
        if(data.state.imagen === null){
            img = 'imagen';
        }
        else{
            img = data.state && data.state.imagen.split('/')
        }
    }


    const defaultValues = data.state && {
        imagen: data.state.imagen ? img[4] : '',
        agencia: data.state.idAgencia || 0,
        ...data.state
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        defaultValues: (data.state && defaultValues)
    });
    
    const [ watchImagen, setWatchImagen ] = useState(data.state ? img[4] : '');
    const navigate = useNavigate();
    const [habilitado, setHabilitado] = useState(data.state?.estado || false);
    const agencias = useSelector(store => store.listas.agencias);
    const [ titlePage, setTitlePage ] = useState('Ingresar');
    const [ cookies ] = useCookies(['access-token']);
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });

    useEffect(()=>{
        data.state && setValue('agencia', data.state.idAgencia);
        data.state && data.state.imagen && setValue('imagen', data.state.imagen.split('/')[4]);
    },[]);

    useEffect(()=>{
        setTitlePage(data.state ? 'Modificar':'Ingresar');
        const subscription = watch((data) => {
            setWatchImagen(data.imagen[0].name ?? '');
        });
        return () => subscription.unsubscribe();
    }, [watch])


    const saveUsuario = async (data) => {
        data.imagen = data.imagen[0];
        data.idAgencia = data.agencia;
        const ingresar = await ingresarUsuario(data, cookies['access-token']);
        console.log(ingresar);
        setHabBtn(false);
        if(ingresar.ok){
            const resp = await ingresar.json();
            console.log(resp);
            setAlertMessage({
                isView: true, 
                titulo:"Proceso exitoso",
                content: "Usuario ingresado con exito",
                count: ++alertMessage.count,
                tipo: 'success',
                variante: 'filled',
            });
            setHabBtn(true);

        }else{
            const resp = await ingresar.json();
            console.log(resp);
            setAlertMessage({
                isView: true, 
                titulo:"Error",
                content: resp.message,
                count: ++alertMessage.count,
                tipo: 'error',
                variante: 'filled',
            });
            setHabBtn(true);

        }
    }

    const updateUsuario = async (form) => {
        form.imagen = form.imagen[0].name ? form.imagen[0] : form.imagen;
        form.idAgencia = form.agencia;
        const actualizar = await actualizarUsuario(
            data.state.id,
            form,
            cookies['access-token'] 
        );
        if(actualizar.ok){
            const resp = await actualizar.json();
            console.log(resp);
            setAlertMessage({isView: true, 
                titulo:"Proceso exitoso",
                content: resp.message,
                count: ++alertMessage.count,
                tipo: 'success',
                variante: 'filled',
            });
        }else{
            const resp = await actualizar.json();
            console.log(resp);
            setAlertMessage({isView: true, 
                titulo:"Error",
                content: resp.message,
                count: ++alertMessage.count,
                tipo: 'error',
                variante: 'filled',
            });
        }
    }

    return (
        <Plantilla pagina={`Usuarios / ${titlePage}`}>
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
                onSubmit={handleSubmit(data.state ? updateUsuario : saveUsuario)}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    borderRadius: 4,
                    padding: 4,
                    boxShadow: 3
                }} gap={4}>
                    <Stack spacing={3} alignItems="stretch" sx={{width: '50%'}}>
                        <TextField {...register('nombres', { required: true })}
                            id="nombres"
                            error={errors.nombres && true}
                            label='Nombres'
                            variant='outlined'
                            helperText={errors.nombres?.message}
                        />
                        <TextField {...register('apellidos', { required: true })}
                            id="apellidos"
                            error={errors.apellidos && true}
                            label='Apellidos'
                            variant='outlined'
                            helperText={errors.apellidos?.message}
                        />
                        <TextField {...register('cedula', { required: true })}
                            id="cedula"
                            error={errors.cedula && true}
                            label='Cedula'
                            variant='outlined'
                            helperText={errors.cedula?.message}
                        />
                        <TextField {...register('codigo', { required: true })}
                            id="codigo"
                            error={errors.codigo && true}
                            label='Codigo'
                            variant='outlined'
                            helperText={errors.codigo?.message}
                        />
                        <FormControl component='fieldset' variant="filled"  sx={{
                            display: 'flex', 
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Button variant="contained" component="label"
                                color="secondary"
                                sx={{width:'40%', marginLeft: 2}} 
                                endIcon={<PhotoCamera/>}>
                                Subir imagen
                                <input {...register('imagen', { required: true })}
                                    id='imagen' 
                                    hidden 
                                    accept="image/*" 
                                    type="file"
                                />
                            </Button>
                            <FormHelperText error={errors.imagen?.message && true} id="imagen">
                                {errors.imagen?.message || 
                                watchImagen ||
                                "Seleccionar imagen"
                            }</FormHelperText>
                        </FormControl>
                    </Stack>
                    <Stack spacing={3} alignItems="stretch" sx={{width: '50%'}}>
                        <TextField {...register('email', { required: true })}
                            id="email"
                            error={errors.email && true}
                            label='E-mail'
                            variant='outlined'
                            helperText={errors.email?.message}
                        />
                        <TextField {...register('celular', { required: true })}
                            id="celular"
                            error={errors.celular && true}
                            label='Celular'
                            variant='outlined'
                            helperText={errors.celular?.message}
                        />
                        <FormControl id="agencia"
                            error={errors.agencia && true}
                        >
                            <InputLabel id="agencia">
                                Agencia
                            </InputLabel>
                            <Select
                                defaultValue={''}
                                {...(data.state && {value: getValues('agencia')})}
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
                        <FormControl variant="outlined" component="fieldset">
                            <FormLabel component="legend">Estado</FormLabel>
                            <FormControlLabel control={
                                <Switch 
                                    {...register('estado', { required: true })}
                                    checked={habilitado} 
                                    onChange={(evt)=>{
                                    setHabilitado(evt.target.checked)
                                }}/>} 
                                label={habilitado ? "Habilitado" : "Deshabilitado"}
                                
                            />
                        </FormControl>
                    </Stack>
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
                    {data.state && <Button sx={{
                        backgroundColor: '#ff5722',
                        '&:hover': {
                            backgroundColor: '#f4511e',
                        }
                    }} variant="contained"
                        endIcon={<EditIcon/>}
                        onClick={()=>navigate(PrivateRoutes.MODIFICAR_CUENTA, {state: data.state})}
                    >Editar cuenta</Button>}
                    <Button variant="text" 
                        onClick={()=>navigate(PrivateRoutes.USUARIOS)}
                    >Regresar</Button>
                </Stack>
            </Box>
            <AlertaCustom alerta={alertMessage}/>
        </Plantilla>
    );
}
