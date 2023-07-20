import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionGetAllUsuariosCuenta } from "../redux/states/usuariosCuenta";

export const useUsuariosCuenta = () => {
  const [cookies] = useCookies(["access-token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetAllUsuariosCuenta(cookies["access-token"]));
  }, [dispatch]);

  const usuariosCuenta = useSelector((store) => store.usuariosCuenta);

  return [usuariosCuenta];
};
