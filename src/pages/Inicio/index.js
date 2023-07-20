import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plantilla } from "../../components";
import { CardCounter, CardPastelChart } from "./components";
import { CardBarChart } from "./components";
import { useCookies } from "react-cookie";
import { actionGetAllElecciones } from "../../redux/states/elecciones";
import { validarSufragio } from "../../services";
import { useSocios, useAgencias, useBarras } from "./custom-hooks";

export default function Inicio() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["access-token"]);
  const usuarios = useSelector((store) => store.usuariosCuenta);

  const [socios] = useSocios();
  const [agencias] = useAgencias();
  const [barras, barras2] = useBarras();

  const elecciones = useSelector((store) => store.elecciones);

  const [pastelVot, setPastelVot] = useState([]);
  const [eleccion, setEleccion] = useState({});
  const [agencia, setAgencia] = useState("");

  const contarVotos = async (users, elecS) => {
    let votaron = 0;
    let noVotaron = 0;
    for (let item of users) {
      if (item.id) {
        const body = {
          idEleccion: elecS.id,
          idSocio: item.id,
        };

        const resp = await validarSufragio(body, cookies["access-token"]);
        const siVoto = await resp.json();
        if (siVoto.yaVoto) {
          votaron++;
        } else {
          noVotaron++;
        }
      }
    }
    return { votaron, noVotaron };
  };

  const getVotantes = async () => {
    try {
      const election = elecciones.filter(
        (r) => r.estado !== "EN-CURSO" || r.estado !== "NO-INICIADO"
      );
      const elecS = election.pop();

      setEleccion(elecS);

      const ag = agencias.find((r) => r.id === elecS.idAgencia);
      setAgencia(ag.nombre);

      const users = usuarios.filter((dat) => dat.idAgencia === ag.id);

      const cVotos = await contarVotos(users, elecS);

      setPastelVot([
        { name: "Cantidad de votantes", value: cVotos.votaron },
        { name: "Cantidad de no votantes", value: cVotos.noVotaron },
      ]);
    } catch (ex) {
      setPastelVot([
        { name: "Cantidad de votantes", value: 1 },
        { name: "Cantidad de no votantes", value: 1 },
      ]);
      setEleccion({ nombre: "", dia: "" });
      console.log(ex);
    }
  };

  useEffect(() => {
    dispatch(actionGetAllElecciones(cookies["access-token"]));
    getVotantes();
  }, []);

  return (
    <Plantilla pagina="Inicio">
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: 10,
        }}
      >
        <Grid item xs={3}>
          <CardCounter
            cantidad={agencias.length}
            titulo="Número de agencias"
            cantidadMaxima={agencias.length + 3}
            altura={240}
          />
        </Grid>
        <Grid item xs={3}>
          <CardCounter
            cantidad={socios.length}
            titulo="Número de socios"
            cantidadMaxima={socios.length + 150}
            altura={240}
          />
        </Grid>
        <Grid item xs={6}>
          <CardBarChart
            titulo="Cantidad de socios por agencia"
            data={barras}
            ancho={450}
            alto={180}
            label="socios"
          />
        </Grid>

        <Grid item xs={6}>
          <CardBarChart
            titulo="Cantidad de candidatos por agencia"
            label="candidatos"
            data={barras2}
            ancho={450}
            alto={210}
          />
        </Grid>

        <Grid item xs={6}>
          <CardPastelChart
            data={pastelVot}
            titulo="Resultados de la eleccion mas reciente"
            nombre={eleccion.nombre}
            agencia={agencia}
            fecha={eleccion.dia}
            altura={210}
          />
        </Grid>
      </Grid>
    </Plantilla>
  );
}
