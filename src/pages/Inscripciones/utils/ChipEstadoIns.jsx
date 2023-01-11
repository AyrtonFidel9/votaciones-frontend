import ChipTable from "../../../components/DataGridTable/ChipTable";

const renderStateInscripcion = (estado) => {
    const size = 'medium';
	switch(estado){
		case 'pendiente':
			return (<ChipTable
				text="Pendiente"
				size={size}
				icon="pendiente"
				color="warning"
			/>);
		case 'aprobado':
			return (<ChipTable
				text="Aprobado"
				size={size}
				icon="check"
				color="success"
			/>);
		case 'reprobado':
			return (<ChipTable
				text="Reprobado"
				size={size}
				icon="cancel"
				color="error"
			/>);
	}
}

export { renderStateInscripcion };