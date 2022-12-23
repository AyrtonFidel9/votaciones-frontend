import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";

// se ejecuta cada vez que se llamen a las rutas privadas
export const RecoveryGuard = () => {
    const recoveryState = useSelector((store) => store.recovery);
    return recoveryState.habilitado ? <Outlet/> : <Navigate replace to={PublicRoutes.INGRESAR_NUMERO}/>;
};

export default RecoveryGuard;