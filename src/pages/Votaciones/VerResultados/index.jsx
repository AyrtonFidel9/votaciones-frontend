import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Plantilla } from "../../../components";
import { actionGetAllElecciones } from "../../../redux/states/elecciones";
import { actionGetAllRepresentantes } from "../../../redux/states/representantes";
import { retornarCantVotos } from "../../../services";
import { CardPastelChart } from "../../Reportes/components";
import { actionGetAllUsuariosCuenta } from "../../../redux/states/usuariosCuenta";

export default function VerResultados() {
  const data = useLocation();
  const [resultados, setResultados] = useState([]);
  const repres = useSelector((store) => store.representantes);
  const usuarios = useSelector((store) => store.usuariosCuenta);
  const [cookies] = useCookies(["access-token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetAllElecciones(cookies["access-token"]));
    dispatch(actionGetAllRepresentantes(cookies["access-token"]));
    dispatch(actionGetAllUsuariosCuenta(cookies["access-token"]));
  }, [dispatch]);

  useEffect(() => {
    setResultados([]);
    getData();
  }, [dispatch]);

  const getData = () => {
    const _repres = repres.filter(
      (dat) => dat.idElecciones === data.state.idEleccion
    );
    let vec = [];
    _repres.forEach(async (item) => {
      const principal = usuarios.find((us) => us.codigo === item.principal);
      const resp = await retornarCantVotos(
        item.id,
        item.idElecciones,
        cookies["access-token"]
      );
      const votos = await resp.json();
      vec.push({
        name: `${principal.nombres} ${principal.apellidos}`,
        value: votos.votos,
      });
      setResultados(vec);
      return;
    });
  };

  return (
    <Plantilla pagina="Votaciones / resultados">
      <CardPastelChart
        data={resultados}
        titulo={`Resultados de la elección ${data.state.eleccion}`}
        nombre={data.state.eleccion}
        agencia={data.state.agencia}
        fecha={data.state.dia}
        altura={210}
      />
    </Plantilla>
  );
}
