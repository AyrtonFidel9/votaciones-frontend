import { useSelector } from "react-redux";

export const useAgencias = () => {
  const agencias = useSelector((store) => store.listas.agencias);

  return [agencias];
};
