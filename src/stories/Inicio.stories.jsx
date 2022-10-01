import React from 'react';
import { Inicio } from '../pages';


export default {
    title: 'Paginas/Inicio',
    component: Inicio,
}

const Template = (args) => <Inicio {...args}/>

export const PaginaInicio = Template.bind({});
