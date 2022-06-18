import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnchancedTableToolbar from './EnchancedTableToolbar.jsx'
import EnchancedTableHead from './EnchancedTableHead.jsx'
import EnchancedTableCell from './EnchancedTableCell.jsx'
import {applyFilters, formatDate, getComparator, stableSort} from "./EnchancedTableFunction";
import {useNavigate} from "react-router-dom";


export default function EnchancedTable(props) {
    const navTo = useNavigate()
    const {columns, rows, label} = props
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [filters, setFilters] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filteredRows, setFilteredRows] = useState([...rows])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        const filteredRows = applyFilters(rows, filters)
        setFilteredRows([...filteredRows])

    }, [filters, rows])


    const rowClickHandler = (event, id) => {
        navTo(`/users/${id}/edit`)

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnchancedTableToolbar
                    filters={filters}
                    setFilters={setFilters}
                    rows={filteredRows}
                    columns={columns}
                    label={label}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnchancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={filteredRows.length}
                            columns={columns}
                        />
                        <TableBody>
                            {stableSort(filteredRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const Cells = columns.map((column, i) => {
                                        const {id, date, callback} = column
                                        if (callback) {
                                            const value = row[id]
                                            return (
                                                <EnchancedTableCell align="center"
                                                                    key={`${index}_${id}_${row.id}_${i}`}
                                                                    value={value}
                                                                    callback={callback}>
                                                </EnchancedTableCell>
                                            )
                                        }
                                        return (
                                            <TableCell align="center"
                                                       key={`${index}_${id}_${row.id}`}>{date ? formatDate(row[id]) : row[id]}</TableCell>
                                        )
                                    })

                                    return (
                                        <TableRow
                                            hover
                                            sx={{
                                                "&:hover": {
                                                    cursor: "pointer"
                                                }
                                            }}
                                            onClick={(event) => {
                                                rowClickHandler(event, row.id)
                                            }}

                                            tabIndex={-1}
                                            key={row.id + '_' + index}
                                        >
                                            {Cells}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (33) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100, 500]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}