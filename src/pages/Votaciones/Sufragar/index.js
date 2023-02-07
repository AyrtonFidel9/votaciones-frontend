import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { AlertaCustom, CarruselContent, Plantilla } from "../../../components";
import { Papeleta } from '../components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { enviarVoto } from '../../../services';
import { useLocation } from 'react-router-dom';

export default function Sufragar (){

    const [habBtn, setHabBtn] = useState(true);
    const [habBtnVal, setHabBtnVal] = useState(true);
    const data = useLocation();
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();
    const [alertMessage, setAlertMessage] = useState({
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: 'error',
        variante: '',
    });
    const usuario = useSelector( store => store.usuario);
    const usuarios = useSelector( store => store.usuariosList.filter(us =>
        us.idAgencia === usuario.idAgencia    
    ));
    const eleccion = useSelector( store => {
        return store.elecciones.filter( item => 
            item.estado === 'EN-CURSO' && 
            item.idAgencia === usuario.idAgencia && 
            item.id === data.state.idEleccion
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

    const votarEnBlanco = async () =>{
        setHabBtn(false);
        const dummy = representantes.find( item => item.principal === 0);
        const body = {
            idEleccion: dummy.idElecciones,
            walletRep: dummy.billeteraAddress,
            walletSocio: usuario.billeteraAddress,
        }
        console.log(body);
        const votar = await enviarVoto(body, cookies['access-token']);
        if(votar.ok){
            const resp = await votar.json();
            console.log(resp);
            setAlertMessage({isView: true, 
                titulo:"Proceso realizado con éxito",
                content: "Voto enviado con éxito",
                count: ++alertMessage.count,
                tipo: 'success',
                variante: 'filled',
            });
            setHabBtn(true);

        }else{
            setAlertMessage({isView: true, 
                titulo:"Error",
                content: "Ha ocurrido un error al enviar el voto",
                count: ++alertMessage.count,
                tipo: 'error',
                variante: 'filled',
            });
            setHabBtn(true);

        }

    }
    const sendVoto = async (data) => {
        if(data.representantes){
            setHabBtnVal(false);
            const body = JSON.parse(data.representantes);
            body.walletSocio = usuario.billeteraAddress;
            const votar = await enviarVoto(body, cookies['access-token']);
            if(votar.ok){
                const resp = await votar.json();
                console.log(resp);
                setAlertMessage({isView: true, 
                    titulo:"Proceso realizado con éxito",
                    content: "Voto enviado con éxito",
                    count: ++alertMessage.count,
                    tipo: 'success',
                    variante: 'filled',
                });
                setHabBtnVal(true);

            }else{
                setAlertMessage({isView: true, 
                    titulo:"Error",
                    content: "Ha ocurrido un error al enviar el voto",
                    count: ++alertMessage.count,
                    tipo: 'error',
                    variante: 'filled',
                });
                setHabBtnVal(true);

            }
        }else{
            setAlertMessage({isView: true, 
                titulo:"Atención",
                content: "NO SE HA SELECCIONADO A NNINGUN CANDIDATO",
                count: ++alertMessage.count,
                tipo: 'warning',
                variante: 'filled',
            });
            setHabBtnVal(true);
        }
    }

    const Listas = () => (
        <>{representantes.map(item => {
            if(item.principal !== 0){
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
            }
        })}
        </>
    );

    return (
        <Plantilla pagina="Votaciones/Sufragar">
            <form onSubmit={handleSubmit(sendVoto)}>
                <Stack direction='row' spacing={2} justifyContent='flex-end' p={2}>
                    {
                        habBtn && 
                        <Button 
                            variant='contained'
                            color='secondary' 
                            endIcon={<PanoramaFishEyeIcon/>}
                            onClick={votarEnBlanco}
                        >
                        Votar en blanco</Button>
                    }
                    {
                        habBtnVal &&
                        <Button 
                            color='success'
                            variant='contained' 
                            endIcon={<SendIcon/>}
                            type='submit'
                            >
                        Enviar voto</Button>
                    }
                </Stack>
                <CarruselContent Content={Listas}/>
            </form>
            <AlertaCustom alerta={alertMessage}/>
        </Plantilla>
    );
}