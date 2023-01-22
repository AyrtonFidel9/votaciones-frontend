import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionGetAllUsuariosCuenta } from "../../../redux/states/usuariosCuenta";

export const useSocios = () => {
    const [cookies] = useCookies(['access-token']);
    const socios = useSelector( store => store.usuariosCuenta.filter( r => {
        return r.cuentum.rol === 'ROLE_SOCIO';
    }));

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(actionGetAllUsuariosCuenta(cookies['access-token']));
    },[dispatch]);

    return [socios];
}