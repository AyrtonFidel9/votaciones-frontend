import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PrivateRoutes } from "../routes";
import { validarSufragio } from "../services";
import { useCookies } from "react-cookie";

// se ejecuta cada vez que se llamen a las rutas privadas
const VotarGuard = () => {
  const usuario = useSelector((store) => store.usuario);
  const data = useLocation();
  const [cookies] = useCookies(["access-token"]);

  const [yaVoto, setYaVoto] = useState(false);

  const verificarSufragio = async (token) => {
    const body = {
      idEleccion: data.state.idEleccion,
      idSocio: usuario.id,
    };
    const voto = await validarSufragio(body, token);
    if (voto.ok) {
      const resp = await voto.json();
      setYaVoto(resp.yaVoto);
    }
  };
  useEffect(() => {
    verificarSufragio(cookies["access-token"]);
  }, []);

  return !yaVoto ? <Outlet /> : <Navigate replace to={PrivateRoutes.PERFIL} />;
};

export default VotarGuard;
