import React from 'react';
import { Votaciones } from '../pages';

export default {
    title: 'Paginas/Votaciones',
    component: Votaciones,
}

const Template = (args) => <Votaciones {...args}/>

export const PaginaVotaciones = Template.bind({});