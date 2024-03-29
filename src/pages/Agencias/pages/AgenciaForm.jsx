import React, { useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes";
import {
  actualizarAgencia,
  getAgencia,
  ingresarAgencia,
} from "../../../services";
import { useCookies } from "react-cookie";
import SaveIcon from "@mui/icons-material/Save";
import { updateListas } from "../../../redux/states/listas";
import { useSelector, useDispatch } from "react-redux";

const schema = yup
  .object({
    nombre: yup.string().required("Campo obligatorio"),
    ubicacion: yup.string().required("Campo obligatorio"),
    numRepresentantes: yup
      .number("Solo se admiten números")
      .typeError("Seleccione la cantidad de representantes")
      .required("Campo obligatorio"),
    numGanadores: yup
      .number()
      .typeError("Solo se admiten números")
      .required("Campo obligatorio"),
  })
  .required();

export default function AgenciaForm() {
  const navigate = useNavigate();
  const data = useLocation();
  const [agencias, setAgencias] = useState(
    useSelector((store) => store.listas.agencias)
  );
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
  const [habBtn, setHabBtn] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: data.state?.nombre || "",
      ubicacion: data.state?.ubicacion || "",
      numRepresentantes: data.state?.numRepresentantes || 0,
      numGanadores: data.state?.numGanadores || 0,
    },
  });

  const saveAgencia = async (data) => {
    setHabBtn(false);
    const agencia = await ingresarAgencia(data, cookies["access-token"]);
    setAlertMessage({
      isView: true,
    });
    if (agencia.ok) {
      const resp = await agencia.json();
      setAlertMessage({
        isView: true,
        titulo: "Proceso completado satisfactoriamente",
        content: resp.message,
        count: ++alertMessage.count,
        tipo: "success",
        variante: "filled",
      });
      setHabBtn(true);
      dispatch(updateListas({ agencias: agencias.concat(resp.datos) }));
    } else {
      const resp = await agencia.json();
      setAlertMessage({
        isView: true,
        titulo: "Error",
        content: resp.message,
        count: ++alertMessage.count,
        tipo: "error",
        variante: "filled",
      });
      setHabBtn(true);
    }
  };

  const updateAgencia = async (bodyAgencia) => {
    const updated = await actualizarAgencia(
      data.state.id,
      bodyAgencia,
      cookies["access-token"]
    );
    if (updated.ok) {
      const resp = await updated.json();
      setAlertMessage({
        isView: true,
        titulo:
          resp.message[0] === 1 ? "Tarea completada exitosamente" : "Error",
        content:
          resp.message[0] === 1
            ? `Datos de la agencia actualizados`
            : "Error al actualizar los datos",
        count: ++alertMessage.count,
        tipo: resp.message[0] === 1 ? "success" : "error",
        variante: "filled",
      });
      const agencia = await getAgencia(data.state.id, cookies["access-token"]);
      const datoAgencia = await agencia.json();
      let newAgencia = agencias.map((obj) => obj.id === data.state.id);
      newAgencia = { ...datoAgencia.message };
      const pushAgencia = agencias.filter((obj) => obj.id !== data.state.id);
      dispatch(updateListas({ agencias: pushAgencia.concat(newAgencia) }));
    } else {
      const resp = await updated.json();
      setAlertMessage({
        isView: true,
        titulo: "Error",
        content: resp.message,
        count: ++alertMessage.count,
        tipo: "error",
        variante: "filled",
      });
    }
  };

  return (
    <Plantilla pagina={`Agencias / Ingresar`}>
      <AlertaCustom alerta={alertMessage} />
      <Box
        component="form"
        sx={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
          width: "40vw",
          paddingTop: 3,
        }}
        noValidate={false}
        autoComplete="off"
        gap={2}
        onSubmit={handleSubmit(data.state ? updateAgencia : saveAgencia)}
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
          <TextField
            {...register("nombre", { required: true })}
            id="nombre"
            error={errors.nombre && true}
            label="Nombre"
            variant="outlined"
            helperText={errors.nombre?.message}
          />
          <TextField
            {...register("ubicacion", { required: true })}
            id="ubicacion"
            error={errors.ubicacion && true}
            label="Ubicación"
            variant="outlined"
            helperText={errors.ubicacion?.message}
          />
          <TextField
            {...register("numRepresentantes", { required: true })}
            id="numRepresentantes"
            error={errors.numRepresentantes && true}
            label="Número de representantes"
            variant="outlined"
            type="number"
            helperText={errors.numRepresentantes?.message}
          />
          <TextField
            {...register("numGanadores", { required: true })}
            id="nunGanadores"
            error={errors.numGanadores && true}
            label="Númerto de ganadores"
            variant="outlined"
            type="number"
            helperText={errors.numGanadores?.message}
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
            onClick={() => navigate(PrivateRoutes.AGENCIAS)}
          >
            Regresar
          </Button>
        </Stack>
      </Box>
    </Plantilla>
  );
}
