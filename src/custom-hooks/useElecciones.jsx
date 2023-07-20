import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionGetAllElecciones } from "../redux/states/elecciones";

export const useElecciones = () => {
  const [cookies] = useCookies(["access-token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetAllElecciones(cookies["access-token"]));
  }, [dispatch]);

  const elecciones = useSelector((store) => store.elecciones);

  return [elecciones];
};
