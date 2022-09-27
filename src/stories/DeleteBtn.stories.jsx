import React from 'react';
import DeleteBtn from '../components/DataGridTable/DeleteBtn';

export default {
    title: 'Buttons/DeleteBtn',
    component: DeleteBtn,
    argTypes: {
        onClick: {action: 'Eliminar fila'}
    }
}

const Template = (args) => <DeleteBtn {...args}/>

export const DeleteBtnTable = Template.bind({});



