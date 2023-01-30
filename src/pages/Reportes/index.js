import { Box, 
   Button, 
   Stack, 
   TextField, 
   FormControl, 
   InputLabel,
   Select,
   MenuItem,
   Autocomplete,
   colors
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Plantilla } from '../../components';
import { CardPastelChart } from "./components";
import ResultsReport from "./pages/ResultsReport";
import html2canvas from "html2canvas";
import { actionGetAllElecciones } from "../../redux/states/elecciones";
import { useCookies } from "react-cookie";
import { actionGetAllRepresentantes } from "../../redux/states/representantes";
import { actionGetAllInscripciones } from "../../redux/states/inscripciones";
import { retornarBalance, validarSufragio } from "../../services";
import VotantesReport from "./pages/VotantesReport";

// hacer la vista para el diagrama de barras

export default function Reportes (){
   const agencias = useSelector(store => store.listas.agencias);
   const [agencia, setAgencia] = useState('');
   const [eleccion, setEleccion] = useState('');
   const [reporte, setReporte] = useState(0);
   const eleccionesStore = useSelector(store => store.elecciones);
   const repres = useSelector(store => store.representantes);
   const usuarios = useSelector(store => store.usuariosCuenta);
   const [elecciones, setElecciones] = useState([]);
   const [descargar, setDescargar] = useState(false);
   const dispatch = useDispatch();
   const [cookies] = useCookies(['access-token'])
   const [resultados, setResultados] = useState([]);
   const [representantes, setRepresentantes] = useState([]);
   const [votantes, setVotantes] = useState([]);
   const [ausentes, setAusentes] = useState([]);
   const [pastelVot, setPastelVot] = useState([]);
   const [nombreAgencia, setNombreAgencia] = useState('');

   useEffect(()=>{
      dispatch(actionGetAllElecciones(cookies['access-token']));
      dispatch(actionGetAllRepresentantes(cookies['access-token']));
      dispatch(actionGetAllInscripciones(cookies['access-token']));
   },[dispatch]);
   
   const cambiarAgencia = (evt) => {
      const idAgencia = evt.target.value;
      setAgencia(idAgencia);
      const ag = agencias.filter( it => it.id === idAgencia)[0];
      setNombreAgencia(ag.nombre);
      setEleccion('');
      const eleccDisp = eleccionesStore.filter( r => {
         const estado = r.estado !== 'EN-CURSO' && r.estado !== 'NO-INICIADO';
         return (r.idAgencia === idAgencia && estado);
      });
      setElecciones(eleccDisp.map(value =>({
         label: value.nombre,
         id: value.id,
      })));
   }

   const getVotantes = async (idEleccion) => {
      const users = usuarios.filter( dat => dat.idAgencia === agencia);

      let votaron = 0;
      let noVotaron = 0;

      const siVotaron = users.map(async (item) => {
         // cambiar cuando las billeteras dejen de ser null
         if(item.billeteraAddress){
            const body = {
               idEleccion,
               wallet: item.billeteraAddress,
            }
   
            const resp = await validarSufragio(body, cookies['access-token']);
            const siVoto = await resp.json();
            if(siVoto.yaVoto){
               votaron++;
               return ({
                  Nombres: item.nombres,
                  Apellidos: item.apellidos,
               });
            }else{
               noVotaron++;
               setAusentes(prev => [...prev, {
                  Nombres: item.nombres,
                  Apellidos: item.apellidos,
               }]);
            }
         }
      });
      const results = await Promise.all(siVotaron);
      setVotantes(results.filter(item => item !== undefined));
      setPastelVot([
         {name: 'Cantidad de votantes', value: votaron},
         {name: 'Cantidad de no votantes', value: noVotaron},
      ]);
   }

   const cambiarEleccion = async (evt) => {
      const idEleccion = evt.target.value;
      const text = evt.target.innerText;
      const elec = eleccionesStore.filter( it => it.nombre === text)[0];
      setEleccion(elec);
      setDescargar(false);
      const _repres = repres.filter( dat => dat.idElecciones === elec.id);

      _repres.forEach(async (item) => {
         const principal = usuarios.find( us => us.codigo === item.principal);
         const psuplente = usuarios.find( us => us.codigo === item.psuplente);
         const ssuplente = usuarios.find( us => us.codigo === item.ssuplente);
         
         const resp = await retornarBalance(item.billeteraAddress, cookies['access-token']);
         const votos = await resp.json();

         setResultados(old => [ ...old, {
            name: `${principal.nombres} ${principal.apellidos}`,
            value: parseInt(votos.BNE)
         }]);

         setRepresentantes(old => [ ...old, {
            Principal: `${principal.nombres} ${principal.apellidos}`,
            "Primer Suplente": `${psuplente.nombres} ${psuplente.apellidos}`,
            "Segundo Suplente": `${ssuplente.nombres} ${ssuplente.apellidos}`,
            votos: parseInt(votos.BNE),
         }]);
      });
      getVotantes(elec.id);
   } 

   const pastelCard = useRef();

   const pastelImagen = async () => {
      const element = pastelCard.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/jpg');
      return data;
   }

   

   const DescargarReporte = () => {
      console.log(representantes)
      switch(reporte){
         case 1:
            return <PDFDownloadLink document={<ResultsReport 
               informacion={representantes.sort((a,b) => b.votos - a.votos)} 
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
            return <PDFDownloadLink document={<VotantesReport 
               info1={votantes} 
               info2={ausentes}
               pastel={pastelImagen()}/>}
               fileName="resultados-elecciones-votantes.pdf"
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
                     onChange={(evt)=>{
                        setReporte(evt.target.value);
                        setDescargar(false);
                     }}
                  >
                     <MenuItem key={1} value={1}>Reporte de resultado de la elección</MenuItem>
                     <MenuItem key={2} value={2}>Reporte de votantes de la elección</MenuItem>
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
                  data={reporte === 1 ? resultados : pastelVot}
                  titulo={`Resultados de la elección ${eleccion.nombre}`}
                  nombre={eleccion.nombre}
                  agencia={nombreAgencia}
                  fecha={eleccion.dia}
                  altura={210}
                  innerRef={pastelCard}
               />
            </>
            }
         </Box>
      </Plantilla>
   );
}