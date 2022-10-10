import React from 'react';
import { Socios } from '../pages';

export default {
    title: 'Paginas/Socios',
    component: Socios,
}

const Template = (args) => <Socios {...args}/>

export const PaginaSocios = Template.bind({});