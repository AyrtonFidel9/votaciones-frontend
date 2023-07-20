import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionGetAllRepresentantes } from "../redux/states/representantes";

export const useRepresentantes = () => {
  const [cookies] = useCookies(["access-token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetAllRepresentantes(cookies["access-token"]));
  }, [dispatch]);

  const representantes = useSelector((store) => store.representantes);

  return [representantes];
};
