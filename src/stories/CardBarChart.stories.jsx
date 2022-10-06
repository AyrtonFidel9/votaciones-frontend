import React from 'react';
import { CardBarChart } from '../pages/Inicio/components';


export default {
    title: 'Charts/Diagrama barras',
    component: CardBarChart,
}

const Template = (args) => <CardBarChart {...args} />


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


export const CardDiagramaBarras = Template.bind({});
CardDiagramaBarras.args = {
    data: data,
    titulo: 'Cantidad de candidatos por agencia',
    ancho: 730,
    alto: 250
};