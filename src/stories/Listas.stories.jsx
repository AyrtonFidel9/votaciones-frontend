import React from 'react';
import { Listas } from '../pages';

export default {
    title: 'Paginas/Listas',
    component: Listas,
}

const Template = (args) => <Listas {...args}/>

export const PaginaListas = Template.bind({});