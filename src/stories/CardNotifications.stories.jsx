import React from 'react';
import CardNotification from '../components/HeaderBar/CardNotification';

export default {
    title: 'Barra de inicio/Cards Notification',
    component: CardNotification,
    argTypes:{
        color:{
            options: ['success','error','warning','info'],
            control: {type: 'select'},
        }
    }
}

const Template = (args) => <CardNotification {...args}/>

export const CardNotificationAppBar = Template.bind({});
CardNotificationAppBar.args = {
    contenido: 'Su certificado de votacion a sido generado con exito',
    color: 'success'
};