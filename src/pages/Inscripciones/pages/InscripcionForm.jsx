import React, { useEffect, useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Box,
  Button,
  Stack,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import { FileUploader } from "react-drag-drop-files";
import SaveIcon from "@mui/icons-material/Save";
import { useCookies } from "react-cookie";
import { actionSetInscripcion } from "../../../redux/states/inscripciones";

const fileTypes = ["PDF"];

export default function LoadUsuarios() {
  const { handleSubmit, control } = useForm();

  const usuario = useSelector((store) => store.usuario);
  const eleccionesStore = useSelector((store) => store.elecciones);
  const [habBtn, setHabBtn] = useState(true);
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(null);
  const [declaracion, setDeclaracion] = useState(null);
  const [elecciones, setElecciones] = useState([]);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["access-token"]);
  const [alertMessage, setAlertMessage] = useState({
    isView: false,
    titulo: "",
    content: "",
    count: 0,
    tipo: "error",
    variante: "",
  });

  const cargarElecciones = (idAg) => {
    const tmpElecciones = eleccionesStore
      .filter((f) => f.idAgencia === idAg && f.estado === "NO-INICIADO")
      .map((r) => ({
        label: r.nombre,
        id: r.id,
      }));
    setElecciones(tmpElecciones);
  };

  const subirDatos = (data) => {
    if (formulario && declaracion) {
      setHabBtn(false);
      data.formulario = formulario;
      data.declaracion = declaracion;
      data.idSocio = usuario.id;
      data.idElecciones = data.idElecciones.id;
      const resp = dispatch(
        actionSetInscripcion(data, cookies["access-token"])
      );
      resp.then((msg) => {
        if (msg === true) {
          setAlertMessage((prev) => ({
            isView: true,
            titulo: "Proceso terminado satisfactoriamente",
            content: "Inscripción creada con exito",
            count: ++prev.count,
            tipo: "success",
            variante: "filled",
          }));
          setHabBtn(true);
        } else {
          setAlertMessage &&
            setAlertMessage((prev) => ({
              isView: true,
              titulo: "Error",
              content: msg,
              count: ++prev.count,
              tipo: "error",
              variante: "filled",
            }));
          setHabBtn(true);
        }
      });
    }
  };

  useEffect(() => {
    cargarElecciones(usuario.idAgencia);
  }, []);

  return (
    <Plantilla pagina="Inscripciones / Crear">
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
            id="formulario"
            error={formulario === null}
            sx={{
              margin: "0 auto",
            }}
          >
            <FormLabel
              error={formulario === null}
              sx={{
                marginBottom: 1,
              }}
            >
              {" "}
              Ingrese el formulario de inscripción
            </FormLabel>
            <FileUploader
              multiple={false}
              handleChange={(formulario) => {
                setFormulario(formulario);
              }}
              onTypeError={(err) => {
                setFormulario(null);
              }}
              name="formulario"
              label="Seleccionar archivo o arrastrar y soltar"
              hoverTitle="Soltar el archivo"
              types={fileTypes}
              id="formulario"
            />
            <FormHelperText error={formulario === null} id="formulario">
              {formulario === null ? "Campo obligatorio" : formulario.name}
            </FormHelperText>
          </FormControl>
          <FormControl
            id="declaracion"
            error={declaracion === null}
            sx={{
              margin: "0 auto",
            }}
          >
            <FormLabel
              error={declaracion === null}
              sx={{
                marginBottom: 1,
              }}
            >
              {" "}
              Ingrese la declaración
            </FormLabel>
            <FileUploader
              multiple={false}
              handleChange={(declaracion) => {
                setDeclaracion(declaracion);
              }}
              onTypeError={(err) => {
                setDeclaracion(null);
              }}
              name="declaracion"
              label="Seleccionar archivo o arrastrar y soltar"
              hoverTitle="Soltar el archivo"
              types={fileTypes}
              id="declaracion"
            />
            <FormHelperText error={declaracion === null} id="declaracion">
              {declaracion === null ? "Campo obligatorio" : declaracion.name}
            </FormHelperText>
          </FormControl>
          <Controller
            name="idElecciones"
            control={control}
            render={({
              field: { ref, ...field },
              fieldState: { error, invalid },
            }) => (
              <Autocomplete
                {...field}
                disablePortal
                id="id-elecciones"
                options={elecciones}
                value={field.value || null}
                getOptionLabel={(option) => option?.label || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Elección"
                    inputRef={ref}
                    error={invalid}
                    helperText={error?.message}
                  />
                )}
                onChange={(e, value) => field.onChange(value)}
                sx={{
                  width: "50%",
                  margin: "0 auto",
                }}
              />
            )}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={3}
        >
          {habBtn && (
            <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
              Guardar
            </Button>
          )}
          <Button
            variant="text"
            onClick={() => navigate(PrivateRoutes.INSCRIPCIONES_VISTA_SOCIO)}
          >
            Regresar
          </Button>
        </Stack>
      </Box>
    </Plantilla>
  );
}
