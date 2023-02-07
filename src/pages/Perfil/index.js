import { Box, Paper, TextField, Stack, Chip, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plantilla, AlertaCustom } from "../../components";
import { NotificacionPerfil } from "./components";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { FormControl, FormHelperText  } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useCookies } from 'react-cookie';
import { actualizarUsuario, getUsuarioById } from "../../services";
import { updateUsuario } from "../../redux/states/usuario";
import { urlService } from "../../services/config";

const schema = yup.object({
    nombres: yup.string().required('Campo obligatorio'),
    apellidos: yup.string().required('Campo obligatorio'),
    cedula: yup.string().required('Campo obligatorio'),
    email: yup.string().required('Campo obligatorio'),
    celular: yup.string().required('Campo obligatorio'), 
    imagen: yup.mixed().test("imagen", "Campo obligatorio", (value) => {
        try{
            console.log(value);
        }catch(err){
            console.log(err);
        }
        return value && value.length > 0;
    }),
}).required();

export default function Perfil (){

    const usuario = useSelector( store => store.usuario);
    const [ img, setImg] =  useState('');
    const [ disableInput, setDisableInput ] = useState(true);
    const [ watchImg, setWatchImg ] = useState('');
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });
    const [ cookies ] = useCookies(['access-token']);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(usuario){
            if(usuario.imagen === null){
                setImg('imagen');
                setWatchImg('imagen');
            }
            else{
                const img =  usuario.imagen.toString().includes('/') ? usuario.imagen.toString().split('/')[4] : usuario.imagen;
                console.log(img);
                setImg(img);
                setWatchImg(img);
            }
        }
    },[usuario]);


    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            cedula: usuario.cedula,
            email: usuario.email,
            celular: usuario.celular,
            imagen: usuario.imagen ? 
                usuario.imagen.toString().includes('/') ? 
                usuario.imagen.toString().split('/')[4] : 
                usuario.imagen :
                '' 
        }
    });

    const handleEdit = () => {
        setDisableInput(false);
    }

    useEffect(()=>{
        const subscription = watch((data) => {
            setWatchImg( data.imagen[0].name ?? '');
        });

        return () => subscription.unsubscribe();

    }, [watch])

    const saveUsuario = async (data) => {

        if(data.imagen[0]?.name)
            data.imagen = data.imagen[0];

        const ingresar = await actualizarUsuario(usuario.id, data, cookies['access-token']);
        if(ingresar.ok){
            setAlertMessage({isView: true, 
                titulo:"Actualización completada satisfactoriamente",
                content: "Sus datos han sido actualizados",
                count: ++alertMessage.count,
                tipo: 'success',
                variante: 'filled',
            });
            const user = await getUsuarioById(usuario.id, cookies['access-token']);
            const respUs = await user.json();
            dispatch(updateUsuario(respUs.message));
        }else{
            const resp = await ingresar.json();
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
        <Plantilla pagina='Perfil'>
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    margin: '0 auto',
                    backgroundColor: '#ffffff',
                    borderRadius: 4,
                    padding: 4,
                    marginTop: 3,
                    boxShadow: 3
                }}
                onSubmit={handleSubmit(saveUsuario)}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
                >
                    <img src={usuario.imagen ? `${urlService}/images/${img}` : require("../../assets/user.png")} height={300} alt="Imagen usuario"/>
                    <Stack direction='row' spacing={2} sx={{marginTop:2,}}>
                        {disableInput && <Button 
                            variant='contained' 
                            color='inherit'
                            sx={{
                                width: '100%'

                            }}
                            onClick={handleEdit}
                        >
                            Editar
                        </Button>}
                        { !disableInput && <Button 
                            variant='contained' 
                            sx={{
                                width: '100%',
                                marginLeft: 0,
                            }}
                            type='submit'
                            endIcon={<SaveIcon/>}
                        >
                            Guardar
                        </Button>}
                    </Stack>
                </Box>
                <Stack spacing={2} sx={{marginTop:2, width: '100%',}}>
                    <TextField 
                        {...register('nombres', { required: true })}
                        error={errors.nombres && true} 
                        helperText={errors.nombres?.message}
                        disabled={disableInput}
                        label="Nombres" variant="outlined" />
                    <TextField
                        {...register('apellidos', { required: true })}
                        error={errors.apellidos && true} 
                        helperText={errors.apellidos?.message}
                        disabled={disableInput}
                        label="Apellidos" variant="outlined" />
                    <TextField 
                        {...register('cedula', { required: true })}
                        error={errors.cedula && true} 
                        helperText={errors.cedula?.message}
                        disabled={disableInput}
                        label="Cédula" variant="outlined" />
                    <TextField
                        {...register('email', { required: true })}
                        error={errors.email && true} 
                        helperText={errors.email?.message}
                        disabled={disableInput}
                        label="Email" variant="outlined" />
                    <TextField
                        {...register('celular', { required: true })}
                        error={errors.celular && true} 
                        helperText={errors.celular?.message}
                        disabled={disableInput}
                        label="Tlf Celular" variant="outlined" />
                    { !disableInput && <FormControl component='fieldset' variant="filled"  sx={{
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
                                defaultValue=''
                            />
                        </Button>
                        <FormHelperText error={errors.imagen?.message && true} id="imagen">
                            {errors.imagen?.message || 
                            watchImg || 
                            "Seleccionar imagen"
                        }</FormHelperText>
                    </FormControl> }
                </Stack>
            </Box>
            <Typography sx={{marginTop: 3, marginBottom: 3,}} variant='h6'><b>Notificaciones</b></Typography>
            <Stack spacing={3} sx={{marginBottom: 7}}>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
                <NotificacionPerfil contenido='Notificacion'/>
            </Stack>
            <AlertaCustom alerta={alertMessage}/>
        </Plantilla>
    );
}