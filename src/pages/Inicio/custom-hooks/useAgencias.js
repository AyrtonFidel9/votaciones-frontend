import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { createListas } from "../../../redux/states/listas";
import { getAllAgencias } from "../../../services";

export const useAgencias = () => {
    const [cookies] = useCookies(['access-token']);
    const agencias = useSelector( store => store.listas.agencias);

    const dispatch = useDispatch();

    const load = async () => {
        const agenciasList = await getAllAgencias(cookies['acess-token']);
        if(agenciasList.ok){
            const data = await agenciasList.json();
            dispatch(createListas({agencias: data.message}));
        }
    }

    useEffect(()=> {
        load();
    },[dispatch]);

    return [agencias];
}