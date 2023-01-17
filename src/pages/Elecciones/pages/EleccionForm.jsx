import React, { useEffect, useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import { Box, Button, Stack, TextField, FormControl, InputLabel } from "@mui/material";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText';
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import { ingresarElecccion, updateEleccion } from "../../../services";
import { actionGetAllElecciones, actionIngresarEleccion, actionUpdateElecciones } from "../../../redux/states/elecciones";


const schema = yup.object({
   nombre: yup.string().required('Campo obligatorio'),
   dia: yup.date().typeError("Ingrese una fecha").required('Campo obligatorio'),
   hora: yup.date().typeError("Ingrese una hora").required('Campo obligatorio'),
   duracion: yup.mixed().test("duracion", "La duración debe ser mayor a 0", (value) => {
      return value && value > 0;
   }),
   estado: yup.string().required('Campo obligatorio'),
   agencia: yup.number().typeError("Seleccione una agencia").required('Campo obligatorio'),
}).required();

export default function EleccionesForm() {
   const data = useLocation();
   

   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         nombre: data.state?.nombre || '',
         dia: data.state?.dia || '',
         hora: data.state ? (new Date(`${data.state.dia} ${data.state.hora}`)) : '',
         duracion: data.state?.duracion || 0,
         estado: data.state?.estado || '',
         agencia: data.state?.idAgencia,
      }
   });


   const navigate = useNavigate();
   const agencias = useSelector(store => store.listas.agencias);
   const usuario = useSelector(store => store.usuario);
   const [titlePage, setTitlePage] = useState('Ingresar');
   const [cookies] = useCookies(['access-token']);
   const [time, setTime] = useState('');
   const [day, setDay] = useState('');
   const [estado, setEstado] = useState('');
   const [agencia, setAgencia] = useState(0);
   const dispatch = useDispatch();
   const [alertMessage, setAlertMessage] = useState({
      isView: false,
      titulo: '',
      content: '',
      count: 0,
      tipo: 'error',
      variante: '',
   });

   useEffect(() => {
      setTitlePage(data.state ? 'Modificar' : 'Ingresar');
      data.state && setDay(data.state.dia);
      data.state && setEstado(data.state.estado);
      data.state && setAgencia(data.state.idAgencia);
      data.state && setTime(new Date(`${data.state.dia} ${data.state.hora}`));
   }, []);

   const cambiarAgencia = (evt) => {
      setAgencia(evt.target.value);
   }

   const saveEleccion = async (form) => {
      form.idAgencia = form.agencia;
      form.hora = form.hora.toLocaleTimeString();
      const resp = dispatch(actionIngresarEleccion(form, cookies['access-token']));
      resp.then( msg => {
         if(msg === true){
            setAlertMessage( prev => ({
               isView: true,
               titulo: "Proceso terminado satisfactoriamente",
               content: "Eleccion creada con exito",
               count: ++prev.count,
               tipo: 'success',
               variante: 'filled',
            }));
         }else{
            setAlertMessage && setAlertMessage(prev => ({
               isView: true,
               titulo: "Error",
               content: msg,
               count: ++prev.count,
               tipo: 'error',
               variante: 'filled',
            }));
         }
      });
      
   }

   const actualizarEleccion = async (form) => {

      const hora =  form.hora.toLocaleTimeString();
      const idAgencia = form.agencia;
      
      const body = {
         ...form,
         hora,
         idAgencia,
         wallet: usuario.billeteraAddress,
      };

      const resp = dispatch(actionUpdateElecciones(
         data.state.id, 
         body, 
         cookies['access-token']
      ));

      resp.then( msg => {
         if(msg === true){
            dispatch(actionGetAllElecciones(cookies['access-token']));
            setAlertMessage( prev => ({
               isView: true,
               titulo: "Proceso terminado satisfactoriamente",
               content: "Elección actualizada con exito",
               count: ++prev.count,
               tipo: 'success',
               variante: 'filled',
            }));
         }
         else{
            setAlertMessage(prev => ({
               isView: true,
               titulo: "Error",
               content: msg,
               count: ++prev.count,
               tipo: 'error',
               variante: 'filled',
            }));
         }
      });

   }

   return (
      <Plantilla pagina={`Elecciones / ${titlePage}`}>
         <AlertaCustom alerta={alertMessage} />
         <Box
            component='form'
            sx={{
               margin: '0 auto',
               display: 'flex',
               flexDirection: 'column',
               marginBottom: 10,
               width: '65vw',
               paddingTop: 4,
            }}
            noValidate={false}
            autoComplete="off"
            gap={2}
            onSubmit={handleSubmit(data.state ? actualizarEleccion : saveEleccion)}
         >
            <Box sx={{
               display: 'flex',
               flexDirection: 'row',
               backgroundColor: '#ffffff',
               borderRadius: 4,
               padding: 4,
               boxShadow: 3
            }} gap={4}>
               <Stack spacing={3} alignItems="stretch" sx={{ width: '50%' }}>
                  <TextField {...register('nombre', { required: true })}
                     id="nombre"
                     error={errors.nombre && true}
                     label='Nombre'
                     variant='outlined'
                     helperText={errors.nombre?.message}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        label="Dia"
                        value={day}
                        inputFormat="DD/MM/YYYY"
                        minDate={new Date()}
                        onChange={(newValue) => {
                           setDay(newValue);
                           setValue('dia', newValue);
                        }}
                        renderInput={(params) =>
                           <TextField {...params}
                              {...register('dia', { required: true })}
                              id="dia"
                              error={errors.dia && true}
                              label='Día'
                              variant='outlined'
                              helperText={errors.dia?.message}
                           />}
                     />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <TimePicker
                        label="Hora"
                        value={time}
                        minTime={dayjs().set('hour', 6)}
                        maxTime={dayjs().set('hour', 20)}
                        onChange={(newValue) => {
                           setTime(newValue);
                           setValue('hora', newValue);
                        }}
                        renderInput={(params) => <TextField {...params}
                           {...register('hora', { required: true })}
                           id="hora"
                           error={errors.hora && true}
                           label='Hora'
                           variant='outlined'
                           helperText={errors.hora?.message}
                        />}
                     />
                  </LocalizationProvider>
                  <TextField {...register('duracion', { required: true })}
                     id="duracion"
                     error={errors.duracion && true}
                     label='Duración (horas)'
                     type='number'
                     variant='outlined'
                     helperText={errors.duracion?.message}
                  />
               </Stack>
               <Stack spacing={3} alignItems="stretch" sx={{ width: '50%' }}>
                  <FormControl id="agencia"
                     error={errors.agencia && true}
                  >
                     <InputLabel id="agencia">
                        Agencia
                     </InputLabel>
                     <Select
                        labelId="agencia"
                        id="agencia"
                        label="Agencia"
                        defaultValue={''}
                        {...(data.state && { value: agencia })}
                        {...register('agencia', { required: true })}
                        onChange={cambiarAgencia}
                     >
                        {agencias.map(agencia => (
                           <MenuItem key={agencia.id} value={agencia.id}>{agencia.nombre}</MenuItem>
                        ))}
                     </Select>
                     {errors.agencia && <FormHelperText error={errors.agencia?.message && true} id="agencia"
                     >
                        {errors.agencia?.message}
                     </FormHelperText>}
                  </FormControl>
                  <FormControl id="estado"
                     error={errors.estado && true}
                  >
                     <InputLabel id="rol">
                        Estado
                     </InputLabel>
                     <Select
                        defaultValue={''}
                        value={estado}
                        labelId="estado"
                        id="estado"
                        label="Estado"
                        {...register('estado', { required: true })}
                        onChange={(evt) => setEstado(evt.target.value)}
                     >
                        <MenuItem value="NO-INICIADO">No iniciado</MenuItem>
                        <MenuItem value="EN-CURSO">En curso</MenuItem>
                        <MenuItem value="IMPUGNADO">Impugnado</MenuItem>
                        <MenuItem value="EXITOSO">Exitoso</MenuItem>
                        <MenuItem value="NULIDAD">Nulidad</MenuItem>
                     </Select>
                     <FormHelperText error={errors.estado?.message && true} id="estado">
                        {errors.estado?.message}
                     </FormHelperText>
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
                  endIcon={<SaveIcon />}
               >Guardar</Button>
               <Button variant="text"
                  onClick={() => navigate(PrivateRoutes.ELECCIONES)}
               >Regresar</Button>
            </Stack>
         </Box>
      </Plantilla>
   );
}
