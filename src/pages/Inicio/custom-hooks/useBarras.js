import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { createListas } from "../../../redux/states/listas";
import { getAllAgencias } from "../../../services";
import { actionGetAllRepresentantes } from "../../../redux/states/representantes";
import { actionGetAllElecciones } from "../../../redux/states/elecciones";

export const useBarras = () => {
    const [cookies] = useCookies(['access-token']);
    const agencias = useSelector( store => store.listas.agencias);
    const elecciones = useSelector(store => store.elecciones);
    const representantes = useSelector(store => store.representantes);
    const socios = useSelector( store => store.usuariosCuenta.filter( r => {
        return r.cuentum.rol === 'ROLE_SOCIO';
    }));

    const [ barras, setBarras ] = useState([]);
    const [ barras2, setBarras2 ] = useState([]);
    
    const dispatch = useDispatch();

    const cargarAgencias = () => {
        agencias.forEach( item => {
            let cantidad = socios.filter(
                r => r.idAgencia === item.id
            ).length;
            setBarras( prev => [ ...prev,
                {name: item.nombre, socios: cantidad}]
            );
        });
    
        agencias.forEach( item => {
            const election = elecciones.filter(r => r.idAgencia === item.id);
            if(election.length > 0){
                const elec = election.slice(-1).pop();
                const repres = representantes.filter(r => r.idElecciones === elec.id);
                setBarras2( prev => [ ...prev,
                    {name: item.nombre, candidatos: repres.length}]
                );
            }
        });
    }

    const load = async () => {
        const agenciasList = await getAllAgencias(cookies['acess-token']);
        if(agenciasList.ok){
            const data = await agenciasList.json();
            dispatch(createListas({agencias: data.message}));
        }
    }

    useEffect(()=> {
        dispatch(actionGetAllRepresentantes(cookies['access-token']));
        dispatch(actionGetAllElecciones(cookies['access-token']));
        load();
        setBarras([]);
        setBarras2([]);
        cargarAgencias();
    },[dispatch]);

    return [barras, barras2];
}