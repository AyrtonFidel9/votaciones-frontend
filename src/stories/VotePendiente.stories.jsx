import React from 'react';
import { VotePendiente } from '../pages/Votaciones/components';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Cards Votaciones/Votacion Pendiente',
    component: VotePendiente,
}

const Template = (args) => <VotePendiente {...args}/>

export const CardVotePendiente = Template.bind({});

CardVotePendiente.args = {
    agencia: 'Alausi'
}
