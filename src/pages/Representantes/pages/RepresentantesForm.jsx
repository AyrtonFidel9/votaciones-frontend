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
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { actionIngresarRepresentante, actionUpdateRepresentante } from "../../../redux/states/representantes";
import { PermPhoneMsgSharp } from "@material-ui/icons";

const schema = yup.object({
   principal: yup.object().typeError("Seleccione al Principal").required('Campo obligatorio'),
   psuplente: yup.object().typeError("Seleccione al Primer Suplente").required('Campo obligatorio'),
   ssuplente: yup.object().typeError("Seleccione al Segundo Suplente").required('Campo obligatorio'),
   idInscripcion: yup.object().typeError("Seleccione una inscripción").required('Campo obligatorio'),
   idElecciones: yup.object().typeError("Seleccione una eleccion").required('Campo obligatorio')
}).required();

export default function RepresentantesForm() {

   const navigate = useNavigate();
   const data = useLocation();
   const agencias = useSelector(store => store.listas.agencias);
   const usuarios = useSelector(store => store.usuariosCuenta);
   const inscripcionesStore = useSelector(store => store.inscripciones);
   const eleccionesStore = useSelector(store => store.elecciones);
   const [socios, setSocios] = useState([]);
   const [inscripciones, setInscripciones] = useState([]);
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
   const defInscripcion = {
      label: '',
      id: 0
   };

   const getSocio = (codigo) => {
      const tmpSocio = usuarios.filter(r => r.codigo === codigo);
      const soc = {
         label: `${tmpSocio[0].nombres} ${tmpSocio[0].apellidos} - ${tmpSocio[0].cedula}`,
         codigo: tmpSocio[0].codigo,
         id: tmpSocio[0].id
      };
      return soc;
   }
   const getEleccion = (id) => {
      const tmpEleccion = eleccionesStore.filter(r => r.id === id);
      return ({
         label: tmpEleccion[0].nombre,
         id: tmpEleccion[0].id,
      });
   }

   const getInscripciones = (id) => {
      const tmpIns = inscripciones.filter(r => r.id === id);
      return ({
         label: tmpIns[0].nombre,
         id: tmpIns[0].id,
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

   const {
      handleSubmit,
      control,
      setValue,
      watch,
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         principal: data.state ? getSocio(data.state.principal) : defSocio,
         psuplente: data.state ? getSocio(data.state.psuplente) : defSocio,
         ssuplente: data.state ? getSocio(data.state.ssuplente) : defSocio,
         idInscripcion: data.state && getInscripciones(data.state.idInscripcion),
         idElecciones: data.state && getEleccion(data.state.idElecciones),
      }
   });

   const validarRepresentantes = (representante) => {
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
         return true;
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
         return false;
      }
      return true;
   }


   const saveRepresentante = async (data) => {
      const representante = {
         principal: data.principal.codigo,
         psuplente: data.psuplente.codigo,
         ssuplente: data.ssuplente.codigo,
         idElecciones: data.idElecciones.id,
         idInscripcion: data.idInscripcion.id,
      }
      console.log(representante);
      if(validarRepresentantes(representante)){
         const resp = dispatch(actionIngresarRepresentante(
            representante,
            cookies['access-token'],
         ));
         resp.then(msg=>{
            if(msg === true)
               setAlertMessage( prev => ({
                  isView: true,
                  titulo: "Proceso terminado satisfactoriamente",
                  content: "Representante ingresado con con éxito",
                  count: ++prev.count,
                  tipo: 'success',
                  variante: 'filled',
               }));
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
         })
      }      
   }

   const updateRepresentante = async (bodyRep) => {
      console.log(bodyRep);
      const representante = {
         principal: bodyRep.principal.codigo,
         psuplente: bodyRep.psuplente.codigo,
         ssuplente: bodyRep.ssuplente.codigo,
         idElecciones: bodyRep.idElecciones.id,
         idInscripcion: 1,
      }
      if(validarRepresentantes(representante)){
         const resp = dispatch(actionUpdateRepresentante(
            data.state.id,
            representante,
            cookies['access-token']
         ));
         resp.then(msg=>{
            if(msg === true)
               setAlertMessage( prev => ({
                  isView: true,
                  titulo: "Proceso terminado satisfactoriamente",
                  content: "Representante actualizado con exito",
                  count: ++prev.count,
                  tipo: 'success',
                  variante: 'filled',
               }));
            else{
               setAlertMessage(prev => ({
                  isView: true,
                  titulo: "Error",
                  content: PermPhoneMsgSharp,
                  count: ++prev.count,
                  tipo: 'error',
                  variante: 'filled',
               }));
            }
         })
      }
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

   const cargarInscripciones = () => {
      const tmpIns = inscripcionesStore.filter(f => f.estado === 'aprobado').map(r => ({
         label: r.nombre,
         id: r.id,
      }));
      setInscripciones(tmpIns);
   }

   const cambiarAgencia = (evt) => {
      setAgencia(evt.target.value);
      const idAg = evt.target.value;
      setValue('ssuplente', '');
      setValue('psuplente', '');
      setValue('principal', '');
      cargarSocios(idAg);
      cargarElecciones(idAg);
      cargarInscripciones();
   }

   useEffect(() => {
      setTitlePage(data.state ? 'Modificar' : 'Ingresar');
      setAgencia(data.state ? getAgencia(data.state.idElecciones) : 0);
      data.state && cargarSocios(getAgencia(data.state.idElecciones));
      data.state && cargarElecciones(getAgencia(data.state.idElecciones));
      data.state && cargarInscripciones();
   }, []);

   useEffect(()=>{
      const subscription = watch((data) => {
         if(data.principal){
            console.log(data);
            if(data.principal.codigo !== 0){
               const principal = usuarios.filter(item => 
                  item.codigo === data.principal.codigo)[0];
               //filtrar en una eleccion especifica
               const ins = inscripcionesStore.filter(item=>
                  item.idSocio === principal.id && item.estado === 'aprobado'
                  ).map(r => ({
                     label: r.nombre,
                     id: r.id,
                  }));
               setInscripciones(ins);
            }
         }
      });

      return () => subscription.unsubscribe();

   }, [watch])

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
                           <Controller
                              name="idInscripcion"
                              control={control}
                              render={({
                                 field: { ref, ...field },
                                 fieldState: { error, invalid }
                              }) => (
                                 <Autocomplete
                                    {...field}
                                    disablePortal
                                    id="id-inscripcion"
                                    options={inscripciones}
                                    getOptionLabel={option => {return option?.label || ''}}
                                    renderInput={(params) => <TextField
                                       {...params}
                                       label="Inscripcion"
                                       inputRef={ref}
                                       error={invalid}
                                       helperText={error?.message}
                                    />}
                                    onChange={(e, value) => field.onChange(value)}
                                 />
                              )}
                           />
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
