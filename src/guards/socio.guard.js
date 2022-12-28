import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../routes";

// se ejecuta cada vez que se llamen a las rutas privadas
const SocioGuard = () => {
    const accountState = useSelector((store) => store.account);
    return accountState.rol === 'ROLE_SOCIO' ? <Outlet/> : <Navigate replace to={PublicRoutes.NO_DISPONIBLE}/>;
};


export default SocioGuard;