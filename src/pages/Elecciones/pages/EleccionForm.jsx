import React, { useEffect, useState } from "react";
import { AlertaCustom, Plantilla } from "../../../components";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "react-router-dom";
import { useAgencias } from "../../../custom-hooks";
import { useActualizarEleccion, useSaveEleccion } from "../custom-hooks";
import { schema } from "../utils/schema";
import { CamposForm } from "../components";

export default function EleccionesForm() {
  const data = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: data.state?.nombre || "",
      dia: data.state?.dia || "",
      hora: data.state ? new Date(`${data.state.dia} ${data.state.hora}`) : "",
      duracion: data.state?.duracion || 0,
      estado: data.state?.estado || "",
      agencia: data.state?.idAgencia,
    },
  });

  const [agencias] = useAgencias();
  const [titlePage, setTitlePage] = useState("Ingresar");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [estado, setEstado] = useState("");
  const [agencia, setAgencia] = useState(0);
  const [habBtn, setHabBtn] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    isView: false,
    titulo: "",
    content: "",
    count: 0,
    tipo: "error",
    variante: "",
  });
  const [saveEleccion] = useSaveEleccion({ setHabBtn, setAlertMessage });
  const [actualizarEleccion] = useActualizarEleccion({
    setHabBtn,
    data,
    setAlertMessage,
  });

  useEffect(() => {
    setTitlePage(data.state ? "Modificar" : "Ingresar");
    data.state && setDay(data.state.dia);
    data.state && setEstado(data.state.estado);
    data.state && setAgencia(data.state.idAgencia);
    data.state && setTime(new Date(`${data.state.dia} ${data.state.hora}`));
  }, []);

  const cambiarAgencia = (evt) => {
    setAgencia(evt.target.value);
  };

  return (
    <Plantilla pagina={`Elecciones / ${titlePage}`}>
      <AlertaCustom alerta={alertMessage} />
      <Box
        component="form"
        sx={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
          width: "65vw",
          paddingTop: 4,
        }}
        noValidate={false}
        autoComplete="off"
        gap={2}
        onSubmit={handleSubmit(data.state ? actualizarEleccion : saveEleccion)}
      >
        <CamposForm
          cambiarAgencia={cambiarAgencia}
          errors={errors}
          register={register}
          setValue={setValue}
          agencias={agencias}
          time={time}
          day={day}
          estado={estado}
          agencia={agencia}
          setDay={setDay}
          setTime={setTime}
          setEstado={setEstado}
          data={data}
          habBtn={habBtn}
        />
      </Box>
    </Plantilla>
  );
}
