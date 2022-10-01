import React from "react";
import { Plantilla } from "../../components";


export default function Inicio(){

    const Contenido = () => (
        <p>Hola Mundo</p>
    );

    return (
        <Plantilla Contenido = {Contenido}/>
    );
}