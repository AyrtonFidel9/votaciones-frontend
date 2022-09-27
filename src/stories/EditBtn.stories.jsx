import React from 'react';
import EditBtn from '../components/DataGridTable/EditBtn';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Buttons/EditBtn',
    component: EditBtn,
    argTypes: {
        onClick: {action: 'Editar fila'}
    }
}

const Template = (args) => <EditBtn {...args}/>

export const EditBtnTable = Template.bind({});

EditBtnTable.args={
    onClick: action('Editar fila')
};