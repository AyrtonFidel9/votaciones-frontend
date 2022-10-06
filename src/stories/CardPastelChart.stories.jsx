import React from 'react';
import { CardPastelChart } from '../pages/Inicio/components';


export default {
    title: 'Charts/Diagrama pastel',
    component: CardPastelChart,
}

const Template = (args) => <CardPastelChart {...args} />


const data = [
    { name: 'Socios que votaron', value: 400 },
    { name: 'Socios que no votaron', value: 300 },
];

export const CardDiagramaPastel = Template.bind({});
CardDiagramaPastel.args = {
    data: data,
    titulo: 'Resultados de la eleccion mas reciente',
    nombre: 'Eleccion A',
    agencia: 'Matriz',
    fecha: '22/08/2021',
    altura: 230,
};