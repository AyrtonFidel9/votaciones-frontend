import React, { useEffect, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES as coreES } from "@mui/material/locale";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import ConfirmDelete from "../ConfirmDelete";
import { useDispatch } from "react-redux";
import { createConfirmDeleted } from "../../redux/states/confirmDelete";

const theme = createTheme(
  esES, // x-data-grid translations
  coreES // core translations
);

export default function DataGridTable(props) {
  const {
    columns,
    rows,
    activeCheck,
    eliminarDato,
    mensaje,
    dialogRef,
    handleOpen,
    updateProcRoute,
    habilitarOpciones,
  } = props;

  const [search, setSearch] = useState("");
  const [searchRows, setSearchRows] = useState([]);
  const [activeClear, setActiveClear] = useState(false);
  const [rowsTable, setRowsTable] = useState(rows);
  const dispatch = useDispatch();

  columns.some((col) => col.field === "opciones") ||
    columns.push({
      field: "opciones",
      type: "actions",
      headerClassName: "header-theme",
      headerName: "Opciones",
      width: 200,
      renderCell: (params) => {
        return [
          <DeleteBtn
            key={params.row.id * Math.floor(Math.random() * (49 - 1) + 1)}
            onClick={() => {
              handleOpen();
              dispatch(createConfirmDeleted({ idDelete: params.row.id }));
            }}
          />,
          <EditBtn
            key={params.row.id * Math.floor(Math.random() * (223 - 50) + 50)}
            row={params.row}
            ruta={updateProcRoute}
          />,
        ];
      },
    });

  useEffect(() => {
    setRowsTable(rows);
  }, [rows]);

  const onChangeSearch = (evt) => {
    setSearch(evt.target.value);
    if (evt.target.value !== "") {
      setActiveClear(true);
    } else {
      setActiveClear(false);
    }
  };

  // PENDIENTE: probar funcionamiento con react-hook-form

  useEffect(() => {
    setSearchRows(
      rows.filter((item) => {
        return Object.values(item).some((value) => {
          if (value !== null)
            return value
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase());
        });
      })
    );
  }, [search]);

  useEffect(() => {
    // se ejecuta cuando hay cambios en la tablas
  }, [rowsTable]);

  const hoverClear = (event) => {
    event.preventDefault();
  };

  const clickClear = (event) => {
    setSearch("");
    setActiveClear(false);
    document.querySelector("#outlined-search-table").value = "";
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          marginBottom: "15%",
        }}
      >
        <Container
          sx={{
            margin: 0,
            display: "flex",
          }}
        >
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
                  {activeClear && (
                    <IconButton
                      onClick={clickClear}
                      onMouseDown={hoverClear}
                      edge="end"
                      aria-hidden="true"
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              marginTop: 4,
              marginBottom: 4,
              width: 300,
            }}
            onChange={onChangeSearch}
          />
        </Container>
        <div style={{ height: "400px", width: "100%" }}>
          <ThemeProvider theme={theme}>
            <DataGrid
              rows={search.length === 0 ? rowsTable : searchRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection={activeCheck}
              sx={{
                border: 0,
                "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
                paddingLeft: 1.5,
              }}
              loading={rowsTable.length === 0}
            />
          </ThemeProvider>
        </div>
      </TableContainer>
      <ConfirmDelete
        mensaje={mensaje}
        ref={dialogRef}
        eliminar={eliminarDato}
      />
    </>
  );
}
