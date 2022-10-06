import React from 'react';
import { CardSemiCircleChart } from '../pages/Inicio/components';



export default {
    title: 'Charts/ProgressBar semi circle',
    component: CardSemiCircleChart,
}

const Template = (args) => <CardSemiCircleChart{...args} />

export const CardProgressBarSemi = Template.bind({});
CardProgressBarSemi.args = {
    titulo: 'La Matriz',
    porcentaje: 45,
    ancho: 230,
    estado: 'progreso'
};