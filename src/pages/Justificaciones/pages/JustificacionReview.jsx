import React, { useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import {
  Box,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import SaveIcon from "@mui/icons-material/Save";
import { useCookies } from "react-cookie";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { actionUpdateJustificacion } from "../../../redux/states/justificaciones";
import { urlService } from "../../../services/config";

const schema = yup
  .object({
    id: yup.number().required("Campo obligatorio"),
    estado: yup.string().required("Campo obligatorio"),
    idSocio: yup.string().required("Campo obligatorio"),
    idEleccion: yup.string().required("Campo obligatorio"),
  })
  .required();

export default function ReviewInscripcion() {
  const data = useLocation();
  const [habBtn, setHabBtn] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: data.state.idEleccion,
      estado: data.state.estado,
      nombre: data.state.nombre,
      documento: data.state.documento,
      idEleccion: data.state.idEleccion,
      idSocio: data.state.idSocio,
      fecha: data.state.fecha,
    },
  });

  const navigate = useNavigate();
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
  const [estado, setEstado] = useState(data.state.estado);

  const actualizarDatos = (form) => {
    setHabBtn(false);
    const resp = dispatch(
      actionUpdateJustificacion(data.state.id, form, cookies["access-token"])
    );

    resp.then((msg) => {
      if (msg === true) {
        setAlertMessage((prev) => ({
          isView: true,
          titulo: "Proceso terminado satisfactoriamente",
          content: "Inscripción actualizada con exito",
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
  };

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
        onSubmit={handleSubmit(actualizarDatos)}
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
          <Button
            variant="outlined"
            endIcon={<OpenInNewIcon />}
            color="secondary"
            sx={{
              width: "60%",
              margin: "0 auto",
            }}
            href={`${urlService}/justificacion/${data.state.documento}`}
            target="_blank"
            size="large"
          >
            Abrir documento
          </Button>

          <FormControl
            id="estado"
            error={errors.estado && true}
            sx={{
              width: "60%",
              margin: "0 auto",
            }}
          >
            <InputLabel id="estado">Estado</InputLabel>
            <Select
              defaultValue={""}
              value={estado}
              labelId="estado"
              id="estado"
              label="estado"
              {...register("estado", { required: true })}
              onChange={(evt) => {
                setEstado(evt.target.value);
              }}
            >
              <MenuItem value="pendiente">Pendiente</MenuItem>
              <MenuItem value="aprobado">Aprobado</MenuItem>
              <MenuItem value="reprobado">Reprobado</MenuItem>
            </Select>
            <FormHelperText error={errors.estado?.message && true} id="estado">
              {errors.estado?.message}
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
          {habBtn && (
            <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
              Guardar
            </Button>
          )}
          <Button
            variant="text"
            onClick={() => {
              navigate(PrivateRoutes.JUSTIFICACIONES_INDEX);
            }}
          >
            Regresar
          </Button>
        </Stack>
      </Box>
    </Plantilla>
  );
}
