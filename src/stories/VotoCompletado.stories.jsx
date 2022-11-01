import React from 'react';
import { VoteCompletado } from '../pages/Votaciones/components';

export default {
    title: 'Cards Votaciones/Votacion Completada',
    component: VoteCompletado,
}

const Template = (args) => <VoteCompletado{...args}/>

export const CardVoteCompletado = Template.bind({});

CardVoteCompletado.args = {
    agencia: 'Alausi'
}
