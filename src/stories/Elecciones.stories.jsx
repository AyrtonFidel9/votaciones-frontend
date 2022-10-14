import React from 'react';
import { Elecciones } from '../pages';

export default {
    title: 'Paginas/Elecciones',
    component: Elecciones,
}

const Template = (args) => <Elecciones {...args}/>

export const PaginaElecciones = Template.bind({});