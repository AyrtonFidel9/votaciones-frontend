import React, { useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import { Box, Button, Stack, FormControl, FormLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import { FileUploader } from "react-drag-drop-files";
import SaveIcon from "@mui/icons-material/Save";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import {
  actualizarJustificacion,
  ingresarJustificacion,
} from "../../../services/justificaciones.service";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const fileTypes = ["PDF"];

export default function Justificaciones() {
  const [documento, setDocumento] = useState(null);

  const { handleSubmit, control } = useForm();
  const [cookies] = useCookies(["access-token"]);
  const [alertMessage, setAlertMessage] = useState({
    isView: false,
    titulo: "",
    content: "",
    count: 0,
    tipo: "error",
    variante: "",
  });
  const navigate = useNavigate();
  const data = useLocation();
  const usuario = useSelector((store) => store.usuario);
  const [habBtn, setHabBtn] = useState(true);

  const subirDatos = async (datos) => {
    if (documento) {
      setHabBtn(false);
      datos.documento = documento;
      datos.idSocio = usuario.id;
      datos.idElecciones = data.state.idEleccion;
      const send = await ingresarJustificacion(datos, cookies["access-token"]);
      if (send.ok) {
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Proceso terminado satisfactoriamente",
          content: "Justificación generada con exito",
          count: ++prev.count,
          tipo: "success",
          variante: "filled",
        }));
        setHabBtn(true);
      } else {
        const msg = await send.json();
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Error",
          content: msg.message,
          count: ++prev.count,
          tipo: "error",
          variante: "filled",
        }));
        setHabBtn(true);
      }
    }
  };

  const actualizar = async (datos) => {
    if (documento) {
      datos.documento = documento;
      datos.idSocio = usuario.id;
      datos.idEleccion = data.state.idEleccion;
      const send = await actualizarJustificacion(
        data.state.justificacion?.id,
        datos,
        cookies["access-token"]
      );
      if (send.ok) {
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Proceso terminado satisfactoriamente",
          content: "Justificación actualizada con exito",
          count: ++prev.count,
          tipo: "success",
          variante: "filled",
        }));
      } else {
        const msg = await send.json();
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Error",
          content: msg.message,
          count: ++prev.count,
          tipo: "error",
          variante: "filled",
        }));
      }
    }
  };

  return (
    <Plantilla pagina="Votaciones / Justificar">
      <AlertaCustom alerta={alertMessage} />
      {data.state.justificacion?.id && (
        <Alert
          severity="info"
          sx={{
            margin: "5px auto",
            width: "60%",
            textAlign: "left",
          }}
        >
          <AlertTitle>Estado de revisión</AlertTitle>
          El estado de su justificación es:{" "}
          <strong>{data.state.justificacion?.estado}</strong>
        </Alert>
      )}
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
        onSubmit={
          data.state.justificacion?.id
            ? handleSubmit(actualizar)
            : handleSubmit(subirDatos)
        }
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
              {data.state.justificacion?.length !== 0
                ? "Ingrese un nuevo documento de justificación"
                : "Ingrese el documento de justificacion"}
            </FormLabel>
            <FileUploader
              multiple={false}
              handleChange={(documento) => {
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
          {data.state.justificacion?.estado !== "aprobado" && (
            <>
              {habBtn && (
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SaveIcon />}
                >
                  {data.state.justificacion?.length !== 0
                    ? "Actualizar"
                    : "Guardar"}
                </Button>
              )}
            </>
          )}
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
