import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { CarruselContent, Plantilla } from "../../components";
import { actionGetAgenciaById } from "../../redux/states/agencia";
import { actionGetAllElecciones } from "../../redux/states/elecciones";
import { actionGetAllRepresentantes } from "../../redux/states/representantes";
import { VoteCompletado, VoteJustificar, VotePendiente } from "./components";
import { actionGetAllUsuariosList } from "../../redux/states/usuariosList";
import { validarSufragio } from "../../services";

export default function Votaciones() {
  const [cookies] = useCookies(["access-token"]);
  const usuario = useSelector((store) => store.usuario);
  const elecciones = useSelector((store) => {
    return store.elecciones.filter(
      (item) =>
        item.estado === "EN-CURSO" && item.idAgencia === usuario.idAgencia
    );
  });

  const [pendientes, setPendientes] = useState([]);

  const eleccionesCompletadas = useSelector((store) => {
    return store.elecciones.filter(
      (item) =>
        item.estado !== "EN-CURSO" &&
        item.estado !== "NO-INICIADO" &&
        item.idAgencia === usuario.idAgencia
    );
  });

  const agencia = useSelector((store) => store.agencia);
  const [yaVoto, setYaVoto] = useState(false);

  const dispatch = useDispatch();

  const verificarSufragio = async (token) => {
    if (elecciones.length <= 0) return;
    const _pendientes = [];
    for (let item of elecciones) {
      const body = {
        idEleccion: item.id,
        idSocio: usuario.id,
      };
      const voto = await validarSufragio(body, token);
      if (voto.ok) {
        const resp = await voto.json();
        setYaVoto(resp.yaVoto);
        if (!resp.yaVoto) {
          _pendientes.push(item);
        }
      }
    }
    setPendientes(_pendientes);
  };

  const verificarJustificacion = async (token) => {
    if (eleccionesCompletadas.length <= 0) return;
    const body = {
      idEleccion: eleccionesCompletadas[0].id,
      idSocio: usuario.id,
    };
    const voto = await validarSufragio(body, token);
    if (voto.ok) {
      const resp = await voto.json();
      setYaVoto(resp.yaVoto);
    }
  };

  useEffect(() => {
    dispatch(actionGetAllElecciones(cookies["access-token"]));
    dispatch(actionGetAllRepresentantes(cookies["access-token"]));
    dispatch(actionGetAgenciaById(usuario.idAgencia, cookies["access-token"]));
    dispatch(actionGetAllUsuariosList(cookies["access-token"]));
  }, [dispatch]);

  useEffect(() => {
    verificarSufragio(cookies["access-token"]);
    verificarJustificacion(cookies["access-token"]);
  }, []);

  const VotacionesPendientes = () => (
    <>
      {pendientes.map((item) => {
        return <VotePendiente agencia={agencia.nombre} idEleccion={item.id} />;
      })}
    </>
  );

  const votacionesResultados = () => (
    <>
      {eleccionesCompletadas.map((item) => {
        if (item.idAgencia === agencia.id)
          return (
            <VoteCompletado
              agencia={agencia.nombre}
              idEleccion={item.id}
              dia={item.dia}
              eleccion={item.nombre}
            />
          );
      })}
    </>
  );

  const VotacionesNoCompletadas = () => (
    <>
      {eleccionesCompletadas.map((item) => {
        if (item.idAgencia === agencia.id)
          return (
            <VoteJustificar agencia={agencia.nombre} idEleccion={item.id} />
          );
      })}
    </>
  );

  return (
    <Plantilla pagina="Votaciones">
      {pendientes.length > 0 && (
        <>
          <Typography variant="h6" sx={{ marginBottom: 3, marginTop: 3 }}>
            Votaciones pendientes
          </Typography>
          <CarruselContent Content={VotacionesPendientes} />
        </>
      )}
      {eleccionesCompletadas.length > 0 && yaVoto && (
        <>
          <Typography variant="h6" sx={{ marginBottom: 3, marginTop: 3 }}>
            Votaciones completadas
          </Typography>
          <CarruselContent Content={votacionesResultados} />
        </>
      )}
      {eleccionesCompletadas.length > 0 && !yaVoto && (
        <>
          <Typography variant="h6" sx={{ marginBottom: 3, marginTop: 3 }}>
            Votaciones no completadas
          </Typography>
          <CarruselContent Content={VotacionesNoCompletadas} />
        </>
      )}
      {yaVoto && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            paddingTop: 10,
          }}
          gap={4}
        >
          <img
            src={require("./assets/tarea-completada.png")}
            alt="Tareas completadas"
            width="200"
          />
          <Typography variant="h5">
            Actualmente no tiene procesos de votación pendientes
          </Typography>
        </Box>
      )}
      <div style={{ height: "60px" }}></div>
    </Plantilla>
  );
}
