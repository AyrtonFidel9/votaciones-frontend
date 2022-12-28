const handleDeleteTable = (id, table, setRowTable) => {
    const data = table.filter( r => r.id !== id);
    setRowTable(data);
}

export { handleDeleteTable };