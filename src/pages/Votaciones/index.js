import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { CarruselContent, Plantilla } from "../../components";
import { actionGetAgenciaById } from "../../redux/states/agencia";
import { actionGetAllElecciones } from "../../redux/states/elecciones";
import { actionGetAllRepresentantes } from "../../redux/states/representantes";
import { VoteCompletado, VoteJustificar, VotePendiente } from "./components";
import { actionGetAllUsuariosList } from '../../redux/states/usuariosList';
import { validarSufragio } from "../../services";


// hacer un GUARD para reenviar a votaciones si existe una eleccion dispónible o si ya voto

export default function Votaciones() {

    const [cookies] = useCookies(['access-token']);
    const usuario = useSelector( store => store.usuario);
    const elecciones = useSelector( store => {
        return store.elecciones.filter( item => 
            item.estado === 'EN-CURSO' && item.idAgencia === usuario.idAgencia
        );
    });
    const agencia = useSelector( store => store.agencia );
    const [yaVoto, setYaVoto] = useState(false);

    const dispatch = useDispatch();

    const verificarSufragio = async (token) => {
        const body = {
            idEleccion: elecciones[0].id, 
            wallet: usuario.billeteraAddress,
        }
        const voto = await validarSufragio(body,token);
        if(voto.ok){
            const resp = await voto.json();
            setYaVoto(resp.yaVoto);
        }
    }

    useEffect(()=>{
        dispatch(actionGetAllElecciones(cookies['access-token']));
        dispatch(actionGetAllRepresentantes(cookies['access-token']));
        dispatch(actionGetAgenciaById( usuario.idAgencia, cookies['access-token']));
        dispatch(actionGetAllUsuariosList(cookies['access-token']));
        verificarSufragio(cookies['access-token']);
    },[dispatch]);

    const VotacionesPendientes = () => (
        <VotePendiente agencia={agencia.nombre}/>);

    const VotacionesCompletadas = () => (
        <>
        <VoteCompletado agencia="Alausí" />
        <VoteCompletado agencia="Alausí" />
        <VoteCompletado agencia="Alausí" />
        <VoteCompletado agencia="Alausí" />
        <VoteCompletado agencia="Alausí" />
        </>
    );

    const VotacionesNoCompletadas = () => (
        <>
        <VoteJustificar agencia="San Andrés" />
        <VoteJustificar agencia="San Andrés" />
        <VoteJustificar agencia="San Andrés" />
        <VoteJustificar agencia="San Andrés" />
        <VoteJustificar agencia="San Andrés" />
        </>
    );

    return (
    <Plantilla pagina="Votaciones">
        {elecciones.length > 0 && !yaVoto &&
            <>
                <Typography variant="h6" sx={{ marginBottom: 3, marginTop: 3 }}>
                    Votaciones pendientes
                </Typography>
                <CarruselContent Content={VotacionesPendientes}/>
            </>
        }
        <Typography variant="h6" sx={{ marginBottom: 3, marginTop: 3 }}>
            Votaciones completadas
        </Typography>
        <CarruselContent Content={VotacionesCompletadas} />
        <Typography variant="h6" sx={{ marginBottom: 3, marginTop: 3 }}>
            Votaciones no completadas
        </Typography>
        <CarruselContent Content={VotacionesNoCompletadas} />
        <div style={{ height: "60px" }}></div>
    </Plantilla>
    );
}
