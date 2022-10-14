import React from 'react';
import { Agencias } from '../pages';

export default {
    title: 'Paginas/Agencias',
    component: Agencias,
}

const Template = (args) => <Agencias {...args}/>

export const PaginaAgencias = Template.bind({});