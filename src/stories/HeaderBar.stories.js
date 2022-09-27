import React from 'react';
import HeaderBar from '../components/HeaderBar';

export default {
    title: 'Barra de inicio/HeaderBar',
    component: HeaderBar,
}

const Template = (args) => <HeaderBar {...args}/>

export const HeaderAppBar = Template.bind({});
HeaderAppBar.args = {
    paginaActual: 'Inicio'
}