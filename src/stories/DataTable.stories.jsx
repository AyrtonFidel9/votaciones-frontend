import React from 'react';
import DataTable from '../components/DataTable';

export default {
    title: 'Tables/TablesView',
    component: DataTable,
}

const jsonData = require('../mocks/agencias.json');

const Template = (args) => <DataTable {...args} />;

export const ViewTable = Template.bind({});
ViewTable.args={
    content: jsonData
}


