import React, { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES as coreES } from '@mui/material/locale';
import ClearIcon from '@mui/icons-material/Clear';
import ViewBtn from './ViewBtn';

const theme = createTheme(
    esES, // x-data-grid translations
    coreES, // core translations
);

export default function TableInscriptions(props) {
    const {
        columns,
        rows,
//        pagesPerSize,
//        numberRows,
        activeCheck,
        reviewInscription,
        rutaReview
    } = props;

    const [search, setSearch] = useState('');
    const [searchRows, setSearchRows] = useState([]);
    const [activeClear, setActiveClear] = useState(false);
    const [rowsTable, setRowsTable] = useState(rows);

    columns.some(col => col.field === 'opciones') || columns.push({
        field: 'opciones',
        type: 'actions',
        headerClassName: 'header-theme',
        headerName: 'Opciones',
        width: 200,
        renderCell: (params) => {
            return [
            <ViewBtn
                key={params.row.id*(Math.floor(Math.random() * (223-50)+50))}
                row={params.row}
                ruta={rutaReview}
            />
        ];
    }
    });

    
    useEffect(()=>{
        setRowsTable(rows);
    },[rows]);

    const onChangeSearch = (evt) => {
        setSearch(evt.target.value);
        if(evt.target.value !== ''){
            setActiveClear(true);
        }else{
            setActiveClear(false);
        }
    }


    // PENDIENTE: probar funcionamiento con react-hook-form
    
    useEffect(() => {
        setSearchRows(rows.filter(item => {
            return Object.values(item).some(value => {
                if(value !== null)
                    return value.toString().toLowerCase()
                        .includes(search.toLowerCase());
            });
    }));
    },[search]);


    const hoverClear = (event) => {
        event.preventDefault();
    };

    const clickClear = (event) => {
        setSearch('');
        setActiveClear(false);
        document.querySelector('#outlined-search-table').value='';
    }


    return (
        <>
        <TableContainer component={Paper} elevation={3} sx={{
            marginBottom: '15%',
        }}>
            <Container sx={{
                margin: 0, display: 'flex',
            }}>
                <TextField
                    id="outlined-search-table"
                    label="Buscar"
                    type="text"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {activeClear && 
                                <IconButton
                                    onClick={clickClear}
                                    onMouseDown={hoverClear}
                                    edge="end"
                                    aria-hidden="true"
                                >
                                    <ClearIcon />   
                                </IconButton>
                                }
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        marginTop: 4,
                        marginBottom: 4,
                        width: 300
                    }}
                    onChange={onChangeSearch}
                />
            </Container>
            <div style={{ height: '400px', width: '100%' }}>
                <ThemeProvider theme={theme}>
                    <DataGrid
                        rows={!searchRows.length ? rowsTable : searchRows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection={activeCheck}
                        sx={{ 
                            border: 0,
                            '& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold'
                            },
                            paddingLeft:1.5,
                        }}
                        loading={rowsTable.length === 0}
                    />
                </ThemeProvider>
            </div>
        </TableContainer>
        </>
    );
}

