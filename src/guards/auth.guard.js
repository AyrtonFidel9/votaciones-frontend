import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../routes";
import { useCookies } from 'react-cookie';



// se ejecuta cada vez que se llamen a las rutas privadas
export const AuthGuard = () => {
    const [cookies, setCookies] = useCookies(['access-token']);
    const accountState = useSelector((store) => store.account);
    return accountState.usuario && cookies['access-token'] ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN}/>;
};


export default AuthGuard;