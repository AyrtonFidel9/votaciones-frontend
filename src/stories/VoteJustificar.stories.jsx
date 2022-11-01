import React from 'react';
import { VoteJustificar } from '../pages/Votaciones/components';

export default {
    title: 'Cards Votaciones/Votacion Justificar',
    component: VoteJustificar,
}

const Template = (args) => <VoteJustificar{...args}/>

export const CardVoteJustificar = Template.bind({});

CardVoteJustificar.args = {
    agencia: 'Alausi'
}
