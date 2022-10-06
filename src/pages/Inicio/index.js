import { Grid, Box } from "@mui/material";
import React from "react";
import { Plantilla } from "../../components";
import { CardCounter, CardPastelChart } from "./components";
import { CardBarChart } from "./components";

const data = [
    {
        "name": "Agencia A",
        "candidatos": 4,
    },
    {
        "name": "Agencia B",
        "candidatos": 10,
    },
    {
        "name": "Agencia C",
        "candidatos": 12,
    },
    {
        "name": "Agencia D",
        "candidatos": 7,
    },
    {
        "name": "Agencia E",
        "candidatos": 5,
    },
    {
        "name": "Agencia F",
        "candidatos":9,
    },
    {
        "name": "Agencia G",
        "candidatos": 4,
    }
]
const data2 = [
    { name: 'Socios que votaron', value: 400 },
    { name: 'Socios que no votaron', value: 300 },
];


export default function Inicio(){

    const Contenido = () => (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <CardCounter 
                    cantidad={12}
                    titulo='Número de agencias'
                    cantidadMaxima={20}
                    altura={200}
                />
            </Grid>
            <Grid item xs={3}>
                <CardCounter 
                    cantidad={4450}
                    titulo='Número de socios'
                    cantidadMaxima={6000}
                    altura={200}
                />
            </Grid>
            <Grid item xs={6}>
                <CardCounter 
                    cantidad={12}
                    titulo='Número de agencias'
                    cantidadMaxima={20}
                />
            </Grid>
            <Grid item xs={6}>
                <CardBarChart 
                    titulo='Cantidad de candidatos por agencia'
                    data={data}
                    ancho={500}
                    alto={210}
                />
            </Grid>
            <Grid item xs={6}>
                <CardPastelChart
                    data={data2}
                    titulo='Resultados de la eleccion mas reciente'
                    nombre='Eleccion A'
                    agencia='Matriz'
                    fecha='22/08/2021'
                    altura={210}
                />
            </Grid>
        </Grid>
    );

    return (
        <Plantilla Contenido={Contenido}/>
    );
}