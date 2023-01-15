import { Box, 
   Button, 
   Stack, 
   TextField, 
   FormControl, 
   InputLabel,
   Select,
   MenuItem,
   Grid,
   Autocomplete
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Plantilla } from '../../components';
import { CardPastelChart } from "../Inicio/components";
import ResultsReport from "./pages/ResultsReport";
import html2canvas from "html2canvas";
import styled from "styled-components";
import { actionGetAllElecciones } from "../../redux/states/elecciones";
import { useCookies } from "react-cookie";
import { actionGetAllRepresentantes } from "../../redux/states/representantes";
import { actionGetAllInscripciones } from "../../redux/states/inscripciones";

const data2 = [
   { name: 'Repo 1', value: 400 },
   { name: 'Rep 2', value: 300 },
   { name: 'Rep 3', value: 100 },
   { name: 'Rep 4', value: 50 },
   { name: 'Rep 5', value: 90 },
   { name: 'Rep 6', value: 310 },
];

export default function Reportes (){

   const agencias = useSelector(store => store.listas.agencias);
   const [agencia, setAgencia] = useState('');
   const [eleccion, setEleccion] = useState('');
   const [reporte, setReporte] = useState(0);
   const eleccionesStore = useSelector(store => store.elecciones);
   const [elecciones, setElecciones] = useState([]);
   const [descargar, setDescargar] = useState(false);
   const dispatch = useDispatch();
   const [cookies] = useCookies(['access-token'])

   const inscripciones = useSelector(store => store.inscripciones);

   useEffect(()=>{
      dispatch(actionGetAllElecciones(cookies['access-token']));
      dispatch(actionGetAllRepresentantes(cookies['access-token']));
      dispatch(actionGetAllInscripciones(cookies['access-token']));
   },[dispatch]);
   
   const cambiarAgencia = (evt) => {
      const idAgencia = evt.target.value;
      setAgencia(idAgencia);
      setEleccion('');
      const eleccDisp = eleccionesStore.filter( r => {
         const estado = r.estado !== 'EN-CURSO' && r.estado !== 'NO-INICIADO';
         return (r.idAgencia === idAgencia && estado);
      });
      setElecciones(eleccDisp.map(value =>({
         label: value.nombre,
         id: value.id
      })));
   }

   const cambiarEleccion = (evt) => {
      const idEleccion = evt.target.value;
      setEleccion(idEleccion);
      setDescargar(false);
   } 
   const pastelCard = useRef();

   const pastelImagen = async () => {
      const element = pastelCard.current;
      console.log(element)
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/jpg');
      return data;
   }

   const DescargarReporte = () => {
      switch(reporte){
         case 1:
            return <PDFDownloadLink document={<ResultsReport informacion={inscripciones} 
               pastel={pastelImagen()}/>}
               fileName="resultados-elecciones.pdf"
               style={{
                  borderRadius: 10,
                  borderStyle: 'solid',
                  backgroundColor: '#00860A',
                  color: 'white',
                  width: 'auto',
                  borderWidth: 0,
                  height: 40,
                  margin: '0 auto',
                  display: 'flex',
                  placeContent: 'center',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingTop: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
               }}
            >
               {({ blob, url, loading, error }) =>
                  loading ? 'Cargando documento...' : 'Descargar!'
               }
            </PDFDownloadLink>
         case 2:
            return <PDFDownloadLink document={<ResultsReport informacion={inscripciones} 
               pastel={pastelImagen()}/>}
               fileName="resultados-elecciones.pdf"
               style={{
                  borderRadius: 10,
                  borderStyle: 'solid',
                  backgroundColor: '#00860A',
                  color: 'white',
                  width: 'auto',
                  borderWidth: 0,
                  height: 40,
                  margin: '0 auto',
                  display: 'flex',
                  placeContent: 'center',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingTop: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
               }}
            >
               {({ blob, url, loading, error }) =>
                  loading ? 'Cargando documento...' : 'Descargar!'
               }
            </PDFDownloadLink>
      }
   }

   return (
      <Plantilla pagina="Reportes">
         <Box
            component='form'
            sx={{
               margin: '0 auto',
               display: 'flex',
               flexDirection: 'column',
               marginBottom: 10,
               width: '65vw',
               paddingTop: 5,
               backgroundColor: '#ffffff',
               borderRadius: 4,
               padding: 4,
               boxShadow: 3
            }}
            noValidate={false}
            autoComplete="off"
            gap={4}
         >
            <Stack direction='row' justifyContent="center" spacing={3}>
               <FormControl id="agencia" sx={{
                  width: '50%'
               }}>
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
               <Autocomplete
                  disablePortal
                  selectOnFocus
                  autoHighlight
                  id="elecciones"
                  options={elecciones}
                  getOptionLabel={(option) => option?.label || option || ''}
                  renderInput={(params) => <TextField
                     {...params}
                     label="Elecciones"
                  />}
                  sx={{
                     width: '50%'
                  }}
                  onChange={cambiarEleccion}
               />
            </Stack>
            <Stack direction='column' justifyContent="center" spacing={3}>
               {eleccion !== '' && <FormControl id="agencia">
                  <InputLabel id="agencia">
                     Reportes
                  </InputLabel>
                  <Select
                     labelId="reportes"
                     id="reportes"
                     label="Reportes"
                     defaultValue={''}
                     onChange={(evt)=>setReporte(evt.target.value)}
                  >
                     <MenuItem key={1} value={1}>Reporte de resultado de la elección</MenuItem>
                     <MenuItem key={2} value={2}>Reporte de votantescde la elección</MenuItem>
                  </Select>
               </FormControl>}
            </Stack>
            {descargar && 
               <DescargarReporte/>  
            }
            {reporte !== 0 && <>
               {descargar === false && <Button
                  variant='contained'
                  onClick={()=>setDescargar(true)}
               >Transformar reporte a PDF</Button>}
               <CardPastelChart
                  data={data2}
                  titulo='Resultados de la eleccion mas reciente'
                  nombre='Eleccion A'
                  agencia='Matriz'
                  fecha='22/08/2021'
                  altura={210}
                  innerRef={pastelCard}
               />
            </>
            }
            
         </Box>
      </Plantilla>
   );
}