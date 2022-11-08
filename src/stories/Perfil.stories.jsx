import React from 'react';
import { Perfil } from '../pages';


export default {
    title: 'Paginas/Perfil',
    component: Perfil,
}

const Template = (args) => <Perfil {...args}/>

export const PaginaPerfil = Template.bind({});

PaginaPerfil.args = {
    habilitado: true,
}