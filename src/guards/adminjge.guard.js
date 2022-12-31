import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../routes";


// se ejecuta cada vez que se llamen a las rutas privadas
const AdminJgeGuard = () => {
    const accountState = useSelector((store) => store.account);
    const rol = accountState.rol;
    return rol === 'ROLE_ADMIN' ||  rol === 'ROLE_JGE' ? 
        <Outlet/> : <Navigate replace to={PublicRoutes.NO_DISPONIBLE}/>;
};


export default AdminJgeGuard;