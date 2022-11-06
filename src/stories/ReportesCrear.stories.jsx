import React from 'react';
import { CrearReporte } from '../pages/Reportes/components';


export default {
    title: 'Paginas/Crear Reporte',
    component: CrearReporte,
}

const Template = (args) => <CrearReporte {...args}/>

export const PaginaCrearReporte = Template.bind({});