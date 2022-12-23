import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";


// se ejecuta cada vez que se llamen a las rutas privadas
export const AuthGuard = () => {
    const accountState = useSelector((store) => store.account);
    console.log(accountState);
    return accountState.usuario ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN}/>;
};


export default AuthGuard;