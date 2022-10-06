import React from 'react';
import { NavBar } from '../components';

export default {
    title: 'Barra Navegacion/Main NAV',
    component: NavBar,
}

const Template = (args) => <NavBar {...args}/>

export const NavBarUI = Template.bind({});

NavBarUI.args={
    ancho: 22
}