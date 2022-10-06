import React from 'react';
import { CardCounter } from '../pages/Inicio/components';

export default {
    title: 'Charts/Progress Counter',
    component: CardCounter,
}

const Template = (args) => <CardCounter {...args}/>

export const CardProgressCounter = Template.bind({});
CardProgressCounter.args = {
    cantidad: 12,
    titulo: 'Número de agencias',
    cantidadMaxima: 20
};