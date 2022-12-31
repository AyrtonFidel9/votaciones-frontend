import React, { useEffect, useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import { Box, Button, Stack, TextField, FormControl, InputLabel } from "@mui/material";
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import { useCookies } from 'react-cookie';
import SaveIcon from '@mui/icons-material/Save';
import { updateListas } from "../../../redux/states/listas";
import { useSelector, useDispatch } from "react-redux";
import { actionGetAllUsuariosList } from "../../../redux/states/usuariosList";
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { actionGetAllUsuariosCuenta } from "../../../redux/states/usuariosCuenta";
import { actionIngresarRepresentante } from "../../../redux/states/representantes";

const schema = yup.object({
   principal: yup.object().typeError("Seleccione al Principal").required('Campo obligatorio'),
   psuplente: yup.object().typeError("Seleccione al Primer Suplente").required('Campo obligatorio'),
   ssuplente: yup.object().typeError("Seleccione al Segundo Suplente").required('Campo obligatorio'),
   idInscripcion: yup.number().typeError('Seleccione una inscripcion').required('Campo obligatorio'),
   idElecciones: yup.object().typeError("Seleccione una eleccion").typeError('Seleccione una agencia').required('Campo obligatorio')
}).required();

export default function RepresentantesForm() {

   const navigate = useNavigate();
   const data = useLocation();
   const agencias = useSelector(store => store.listas.agencias);
   const usuarios = useSelector(store => store.usuariosCuenta);
   const eleccionesStore = useSelector(store => store.elecciones);
   const [socios, setSocios] = useState([]);
   const [agencia, setAgencia] = useState(0);
   const [elecciones, setElecciones] = useState([]);
   const dispatch = useDispatch();
   const [titlePage, setTitlePage] = useState('Ingresar');
   const [cookies] = useCookies(['access-token']);
   const [alertMessage, setAlertMessage] = useState({
      isView: false,
      titulo: '',
      content: '',
      count: 0,
      tipo: 'error',
      variante: '',
   });

   const defSocio = {
      label: '',
      codigo: 0,
      id: 0
   }

   const defEleccion = {
      label: '',
      id: 0
   }

   const getSocio = (codigo) => {
      const tmpSocio = usuarios.filter(r => r.codigo === codigo);
      const soc = {
         label: `${tmpSocio[0].nombres} ${tmpSocio[0].apellidos} - ${tmpSocio[0].cedula}`,
         codigo: tmpSocio[0].codigo,
         id: tmpSocio[0].id
      };
      //setValue(tipo, soc);
      return soc;
   }
   const getEleccion = (id) => {
      const tmpEleccion = eleccionesStore.filter(r => r.id === id);
      return ({
         label: tmpEleccion[0].nombre,
         id: tmpEleccion[0].id,
      });
   }

   const getAgencia = (idEleccion) => {
      if (idEleccion) {
         const tmpEleccion = eleccionesStore.filter(r => r.id === idEleccion);
         return tmpEleccion[0].idAgencia;
      } else {
         return 0;
      }
   }

//{ nombre: 'Sonia Maria Guaman Diaz - 0104292461', codigo: 1232, id: 5}
   const {
      register,
      formState: { errors },
      handleSubmit,
      control,
      watch,
      getValues,
      setValue,
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         principal: data.state ? getSocio(data.state.principal) : defSocio,
         psuplente: data.state ? getSocio(data.state.psuplente) : defSocio,
         ssuplente: data.state ? getSocio(data.state.ssuplente) : defSocio,
         idInscripcion: data.state?.idInscripcion || 0,
         idElecciones: data.state ? getEleccion(data.state.idElecciones) : defEleccion,
      }
   });


   const saveRepresentante = async (data) => {

      const representante = {
         principal: data.principal.codigo,
         psuplente: data.psuplente.codigo,
         ssuplente: data.ssuplente.codigo,
         idElecciones: data.idElecciones.id,
         idInscripcion: 1,
      }

      if (
         representante.principal === representante.psuplente ||
         representante.principal === representante.ssuplente
      ) {
         setAlertMessage(prev => ({
            isView: true,
            titulo: "¡ATENCIÓN!",
            content: "El representante no se puede repetir como suplente",
            count: ++prev.count,
            tipo: 'warning',
            variante: 'filled',
         }));
      } else if (
         representante.psuplente === representante.ssuplente
      ) {
         setAlertMessage(prev => ({
            isView: true,
            titulo: "¡ATENCIÓN!",
            content: "El suplente no puede repetirse",
            count: ++prev.count,
            tipo: 'warning',
            variante: 'filled',
         }));
      }

      dispatch(actionIngresarRepresentante(
         representante,
         cookies['access-token'],
         setAlertMessage
      ));
   }

   const updateRepresentante = async (bodyRep) => {
      console.log(bodyRep);
   }

   const cargarSocios = (idAg) => {
      const temp = usuarios.filter(row => row.idAgencia === idAg && row.cuentum.rol === 'ROLE_SOCIO');
      setSocios(temp.map(value => {
         return ({ label: `${value.nombres} ${value.apellidos} - ${value.cedula}`, codigo: value.codigo, id: value.id });
      }))
   }
   const cargarElecciones = (idAg) => {
      const tmpElecciones = eleccionesStore.filter(f => f.idAgencia === idAg).map(r => ({
         label: r.nombre,
         id: r.id,
      }));
      setElecciones(tmpElecciones);
   }

   const cambiarAgencia = (evt) => {
      setAgencia(evt.target.value);
      const idAg = evt.target.value;
      setValue('ssuplente', '');
      setValue('psuplente', '');
      setValue('principal', '');
      cargarSocios(idAg);
      cargarElecciones(idAg);
   }

   useEffect(() => {
      dispatch(actionGetAllUsuariosCuenta(cookies['access-token']));
      setTitlePage(data.state ? 'Modificar' : 'Ingresar');
      setAgencia(data.state ? getAgencia(data.state.idElecciones) : 0);
      data.state && cargarSocios(getAgencia(data.state.idElecciones));
      data.state && cargarElecciones(getAgencia(data.state.idElecciones));

   }, []);


   return (
      <Plantilla pagina={`Representantes / ${titlePage}`}>
         <AlertaCustom alerta={alertMessage} />
         <Box
            component='form'
            sx={{
               margin: '0 auto',
               display: 'flex',
               flexDirection: 'column',
               marginBottom: 10,
               width: '65vw',
               paddingTop: 5,
            }}
            noValidate={false}
            autoComplete="off"
            gap={2}
            onSubmit={handleSubmit(data.state ? updateRepresentante : saveRepresentante)}
         >
            <Box sx={{
               display: 'flex',
               flexDirection: 'column',
               backgroundColor: '#ffffff',
               borderRadius: 4,
               padding: 4,
               boxShadow: 3
            }} gap={4}>
               <Stack spacing={3} alignItems="stretch" >
                  <FormControl id="agencia">
                     <InputLabel id="agencia">
                        Agencia
                     </InputLabel>
                     <Select
                        labelId="agencia"
                        id="agencia"
                        label="Agencia"
                        defaultValue={''}
                        value={agencia}
                        onChange={cambiarAgencia}
                     >
                        {agencias.map(agencia => (
                           <MenuItem key={agencia.id} value={agencia.id}>{agencia.nombre}</MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack spacing={3} alignItems="stretch" >
                  {agencia !== 0 && <>
                     <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                     }} gap={4}>
                        <Stack spacing={3} alignItems="stretch" sx={{ width: '50%' }}>
                           <Controller
                              name="principal"
                              control={control}
                              render={({
                                 field: { ref, ...field },
                                 fieldState: { error, invalid }
                              }) => (
                                 <Autocomplete
                                    {...field}
                                    disablePortal
                                    selectOnFocus
                                    autoHighlight
                                    id="id-principal"
                                    options={socios}
                                    getOptionLabel={(option) => option?.label || option || ''}
                                    renderInput={(params) => <TextField
                                       {...params}
                                       label="Principal"
                                       inputRef={ref}
                                       error={invalid}
                                       helperText={error?.message}
                                    />}
                                    onChange={(e, value) => field.onChange(value)}
                                 />
                              )}
                           />
                           <Controller
                              name="psuplente"
                              control={control}
                              render={({
                                 field: { ref, ...field },
                                 fieldState: { error, invalid }
                              }) => (
                                 <Autocomplete
                                    {...field}
                                    disablePortal
                                    selectOnFocus
                                    id="id-psuplente"
                                    options={socios}
                                    getOptionLabel={option => option?.label || option || ''}
                                    renderInput={(params) => <TextField
                                       {...params}
                                       label="Primer Suplente"
                                       inputRef={ref}
                                       error={invalid}
                                       helperText={error?.message}
                                    />}
                                    onChange={(e, value) => field.onChange(value)}
                                 />
                              )}
                           />
                           <Controller
                              name="ssuplente"
                              control={control}
                              render={({
                                 field: { ref, ...field },
                                 fieldState: { error, invalid }
                              }) => (
                                 <Autocomplete
                                    {...field}
                                    disablePortal
                                    autoHighlight
                                    autoComplete
                                    id="id-ssuplente"
                                    options={socios}
                                    getOptionLabel={option => option?.label || option || ''}
                                    renderInput={(params) => <TextField
                                       {...params}
                                       label="Segundo Suplente"
                                       inputRef={ref}
                                       error={invalid}
                                       helperText={error?.message}
                                    />}
                                    onChange={(e, value) => field.onChange(value)}
                                 />
                              )}
                           />
                        </Stack>
                        <Stack spacing={3} alignItems="stretch" sx={{ width: '50%' }}>
                           <TextField label="Inscripcion" />
                           <Controller
                              name="idElecciones"
                              control={control}
                              render={({
                                 field: { ref, ...field },
                                 fieldState: { error, invalid }
                              }) => (
                                 <Autocomplete
                                    {...field}
                                    disablePortal
                                    id="id-elecciones"
                                    options={elecciones}
                                    getOptionLabel={option => data.state ? option?.label || option || '' : option?.label || ''}
                                    renderInput={(params) => <TextField
                                       {...params}
                                       label="Elección"
                                       inputRef={ref}
                                       error={invalid}
                                       helperText={error?.message}
                                    />}
                                    onChange={(e, value) => field.onChange(value)}
                                 />
                              )}
                           />
                        </Stack>
                     </Box>

                  </>
                  }
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
                  onClick={() => navigate(PrivateRoutes.REPRESENTANTES)}
               >Regresar</Button>
            </Stack>
         </Box>
         <AlertaCustom alerta={alertMessage} />
      </Plantilla>
   );
}
