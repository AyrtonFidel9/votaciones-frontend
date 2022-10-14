import React from "react";
import ChipTable from "../components/DataGridTable/ChipTable";

const renderNewCellValue = (params) => {
    
    const newKey = params.row.id+params.row.agencia+Math.random(12);

    switch(params.row.estado){
        case "en curso":
            return (<ChipTable
                key={newKey}
                text="En curso"
                size="medium"
                icon="live"
                color="success"
            />);
        case "exitoso":
            return (<ChipTable
                key={newKey} 
                text="Exitosa"
                size="medium"
                icon="check"
                color="success"
            />);
        case "nulidad":
            return (<ChipTable
                key={newKey}
                text="Nulidad"
                size="medium"
                icon="error"
                color="error"
            />);
        case "impugnado":
            return (<ChipTable 
                key={newKey}
                text="Impugnado"
                size="medium"
                icon="error"
                color="error"
            />);
    };
}

export default { renderNewCellValue };