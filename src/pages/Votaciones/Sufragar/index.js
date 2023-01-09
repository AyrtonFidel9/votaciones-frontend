import { Button, Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { CarruselContent, Plantilla } from "../../../components";
import { Papeleta } from '../components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

export default function Sufragar (){

    const {
        register,
        handleSubmit,
        setValue
    } = useForm();

    const usuario = useSelector( store => store.usuario);
    const usuarios = useSelector( store => store.usuariosList.filter(us =>
        us.idAgencia === usuario.idAgencia    
    ));
    const eleccion = useSelector( store => {
        return store.elecciones.filter( item => 
            item.estado === 'EN-CURSO' && item.idAgencia === usuario.idAgencia
        );
    });
    const representantes = useSelector( store => store.representantes.filter( rep => 
        rep.idElecciones === eleccion[0].id
    ));
    const [cookies] = useCookies(['access-token']);
    const dispatch = useDispatch();

    const getNameImageUser = (user) => {
        return user.imagen ? user.imagen.toString().split('/')[4] : '';
    }

    const getInfoUser = (user, tipo) => {
        return usuarios.filter( us => us.codigo === user[tipo])[0];
    }

    const sendVoto = (data) => {
        if(data.representantes){
            const body = JSON.parse(data.representantes);
            body.walletSocio = usuario.billeteraAddress;
            console.log(body);
        }else{
            console.error("NO SE HA SELECCIONADO A NNINGUN CANDIDATO")
        }
    }

    const Listas = () => (
        <>{representantes.map(item => {
            const representante = getInfoUser(item, 'principal');
            const psuplente = getInfoUser(item, 'psuplente');
            const ssuplente = getInfoUser(item, 'ssuplente');
            const imgRep = getNameImageUser(representante);
            const imgPS = getNameImageUser(psuplente);
            const imgSS = getNameImageUser(ssuplente);

            return (<Papeleta
                key={item.id} 
                representante={`${representante.nombres} ${representante.apellidos}`}
                psuplente={`${psuplente.nombres} ${psuplente.apellidos}`}
                ssuplente={`${ssuplente.nombres} ${ssuplente.apellidos}`}
                imgRep={imgRep}
                imgPS={imgPS}
                imgSS={imgSS}
                idEleccion={item.idElecciones}
                walletRep={item.billeteraAddress}
                register={register}
                idRepresentante={item.id}
                setValue={setValue}
            />);
        })}
        </>
    );

    return (
        <Plantilla pagina="Votaciones/Sufragar">
            <form onSubmit={handleSubmit(sendVoto)}>
                <Stack direction='row' spacing={2} justifyContent='flex-end' p={2}>
                    <Button 
                        variant='contained'
                        color='secondary' 
                        endIcon={<PanoramaFishEyeIcon/>}
                    >
                    Votar en blanco</Button>
                    <Button 
                        color='success'
                        variant='contained' 
                        endIcon={<SendIcon/>}
                        type='submit'
                        >
                    Enviar voto</Button>
                </Stack>
                <CarruselContent Content={Listas}/>
            </form>
        </Plantilla>
    );
}