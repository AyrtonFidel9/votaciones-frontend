import React from 'react';
import { ConfirmDelete } from '../components';

export default {
    title: 'Confirms/Delete',
    component: ConfirmDelete,
}

const Template = (args) => <ConfirmDelete {...args}/>

export const ConfirmarEliminacion = Template.bind({});

ConfirmarEliminacion.args = {
    mensaje: '¿Esta seguro/a en eliminar al socio?'
}