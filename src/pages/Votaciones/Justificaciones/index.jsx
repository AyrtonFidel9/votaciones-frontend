import React, { useState, useEffect } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import { Box, Button, Stack, FormControl,  FormLabel, TextField } from "@mui/material";
import { Controller, useForm } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import { FileUploader } from "react-drag-drop-files";
import SaveIcon from '@mui/icons-material/Save';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from '@mui/material/Autocomplete';


const fileTypes = ["PDF"];

export default function Justificaciones() {

    const [ documento, setDocumento ] = useState(null);

    const {
        handleSubmit,
        control,
    } = useForm();
    const [cookies] = useCookies(['access-token']);
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useLocation();
    console.log(data.state);
    const usuario = useSelector( store => store.usuario );

    const [ elecciones, setElecciones ] = useState([]);






    const subirDatos = (data) => {
        console.log(data);
        if(documento){
            data.documento = documento;
            //data.idSocio = usuario.id;
            data.idElecciones = data.idElecciones.id;
            console.log(data);
            // const resp = dispatch(actionSetInscripcion(data, cookies['access-token']));
            // resp.then( msg => {
            //     if(msg === true){
            //         setAlertMessage( prev => ({
            //         isView: true,
            //         titulo: "Proceso terminado satisfactoriamente",
            //         content: "Inscripción creada con exito",
            //         count: ++prev.count,
            //         tipo: 'success',
            //         variante: 'filled',
            //         }));
            //     }else{
            //         setAlertMessage && setAlertMessage(prev => ({
            //         isView: true,
            //         titulo: "Error",
            //         content: msg,
            //         count: ++prev.count,
            //         tipo: 'error',
            //         variante: 'filled',
            //         }));
            //     }});
        }   
    }

    return (
    <Plantilla pagina="Votaciones / Justificar">
        <AlertaCustom alerta={alertMessage} />
        <Box
        component="form"
        sx={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            marginBottom: 10,
            width: "65vw",
            paddingTop: 2,
        }}
        noValidate={false}
        autoComplete="off"
        gap={2}
        onSubmit={handleSubmit(subirDatos)}
        >
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                borderRadius: 4,
                padding: 4,
                boxShadow: 3,
                }}
                gap={4}
            >
                <FormControl
                    id="documento"
                    error={documento === null}
                    sx={{
                        margin: "0 auto",
                    }}
                >
                    <FormLabel
                        error={documento === null}
                        sx={{
                        marginBottom: 1,
                        }}
                    >
                        Ingrese el documento de justificacion
                    </FormLabel>
                    <FileUploader
                        multiple={false}
                        handleChange={(documento) => {
                        console.log(documento);
                        setDocumento(documento);
                        }}
                        onTypeError={(err) => {
                        setDocumento(null);
                        }}
                        name="documento"
                        label="Seleccionar archivo o arrastrar y soltar"
                        hoverTitle="Soltar el archivo"
                        types={fileTypes}
                        id="documento"
                    />
                    <FormHelperText error={documento === null} id="documento">
                        {documento === null ? "Campo obligatorio" : documento.name}
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
                <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
                Guardar
                </Button>
                <Button
                variant="text"
                onClick={() => navigate(PrivateRoutes.VOTACIONES)}
                >
                Regresar
                </Button>
            </Stack>
        </Box>
    </Plantilla>
    );
    }
