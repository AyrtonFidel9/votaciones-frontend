import React from 'react';
import ChipTable from '../components/DataGridTable/ChipTable';

export default{
    title: 'Tables/ChipTable',
    component: ChipTable,
    argTypes:{
        size:{
            options: ['small', 'medium'],
            control: { type: 'select' },
        },
        color:{
            options: ['error','success','warning'],
            control: { type: 'select' },
        },
        icon:{
            options: ['check','error','live','cancel'],
            control: {type: 'select'},
        }
    }
};

const Template = (args) => <ChipTable {...args}/>

export const ChipInfoTable = Template.bind({});
ChipInfoTable.args={
    text: 'En curso',
    size: 'medium',
    icon: 'check',
    color: 'success'
}
