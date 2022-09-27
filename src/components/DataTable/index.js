import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function DataTable(props) {
  const { content } = props;

  // se saca los encabezados y se los normaliza
  const rawHeaders = Object.keys(content[0]);
  const headers = rawHeaders.map(letter => {
    const capitalized = letter.replace(/^./, letter[0].toUpperCase());
    return capitalized;
  });

  return (
    <TableContainer component={Paper} elevation={4}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell>
                <strong>{header}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map(row => {
            return (
              <TableRow
                key={row[0]}
              >
                {Object.values(row).map(val =>
                  <TableCell align='left'>{val}</TableCell>
                )}
              </TableRow>);
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}