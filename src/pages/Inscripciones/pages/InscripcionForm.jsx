import React, { useState } from "react";
import { Plantilla } from "../../../components";
import { Box, Button, Stack, FormControl,  FormLabel } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import { FileUploader } from "react-drag-drop-files";
import SaveIcon from '@mui/icons-material/Save';

const fileTypes = ["PDF"];

export default function LoadUsuarios(){

   const {
      handleSubmit,
   } = useForm();

   const usuario = useSelector( store => store.usuario );

   const navigate = useNavigate();
   const [ formulario, setFormulario ] = useState(null);
   const [ declaracion, setDeclaracion ] = useState(null);
   
   const subirDatos = (data) => {
      if(formulario && declaracion){
         data.formulario = formulario;
         data.declaracion = declaracion;
         data.idSocio = usuario.id;
         console.log(data);
      }
   }

   return (
      <Plantilla pagina="Inscripciones / Crear">
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
                  <FormControl id="formulario"
                     error={formulario === null}
                     sx={{
                           margin: '0 auto'
                     }}
                  >
                     <FormLabel error={formulario === null} sx={{
                        marginBottom: 1
                     }}> Ingrese el formulario de inscripción</FormLabel>
                     <FileUploader
                           multiple={false}
                           handleChange={(formulario)=>{
                              console.log(formulario);
                              setFormulario(formulario);
                           }}
                           onTypeError={
                              (err)=>{
                                 setFormulario(null);
                              }
                           }
                           name="formulario"
                           label="Seleccionar archivo o arrastrar y soltar"
                           hoverTitle="Soltar el archivo"
                           types={fileTypes}
                           id="formulario"
                     />
                     <FormHelperText error={formulario === null} id="formulario"
                           >
                           {formulario === null ? 'Campo obligatorio' : formulario.name}
                     </FormHelperText>
                  </FormControl>
                  <FormControl id="declaracion"
                     error={declaracion === null}
                     sx={{
                           margin: '0 auto'
                     }}
                  >
                     <FormLabel error={declaracion === null} sx={{
                        marginBottom: 1
                     }}> Ingrese la declaración</FormLabel>
                     <FileUploader
                           multiple={false}
                           handleChange={(declaracion)=>{
                              console.log(declaracion);
                              setDeclaracion(declaracion);
                           }}
                           onTypeError={
                              (err)=>{
                                 setDeclaracion(null);
                              }
                           }
                           name="declaracion"
                           label="Seleccionar archivo o arrastrar y soltar"
                           hoverTitle="Soltar el archivo"
                           types={fileTypes}
                           id="declaracion"
                     />
                     <FormHelperText error={declaracion === null} id="declaracion"
                           >
                           {declaracion === null ? 'Campo obligatorio' : declaracion.name}
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
                     onClick={()=>navigate(PrivateRoutes.INSCRIPCIONES_VISTA_SOCIO)}
                  >Regresar</Button>
               </Stack>
         </Box>
      </Plantilla>
   )
}