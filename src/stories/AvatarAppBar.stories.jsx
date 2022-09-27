import React from 'react';
import AvatarAppBar from '../components/HeaderBar/AvatarAppBar';

export default {
    title: 'Barra de inicio/IconsButtons/Profile',
    component: AvatarAppBar,
}

const Template = (args) => <AvatarAppBar {...args}/>

export const AvatarHeaderApp = Template.bind({});
AvatarHeaderApp.args = {
    src: 'https://pymstatic.com/44253/conversions/xavier-molina-medium.jpg',
    nombreCompleto: 'Jose De La Cuadra'
}