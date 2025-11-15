import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button, ButtonGroup } from '@material-ui/core';
import { useStore } from '../../../stores';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const EthnicsTable = observer(() => {
  const classes = useStyles();
  const { ethnicsStore } = useStore();

  const handleChangePage = (event, newPage) => {
    ethnicsStore.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    ethnicsStore.setPageSize(parseInt(event.target.value, 10));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="ethnics table">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ethnicsStore.ethnicities.length > 0 ? (
            ethnicsStore.ethnicities.map((ethnicity) => (
              <TableRow key={ethnicity.id}>
                <TableCell component="th" scope="row">
                  {ethnicity.code}
                </TableCell>
                <TableCell align="left">{ethnicity.name}</TableCell>
                <TableCell align="left">{ethnicity.description || '-'}</TableCell>
                <TableCell align="left">
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={() => ethnicsStore.handleEdit(ethnicity)}><EditIcon /></Button>
                    <Button onClick={() => ethnicsStore.handleDelete(ethnicity.id)}><DeleteIcon /></Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={ethnicsStore.totalElements}
        rowsPerPage={ethnicsStore.pageSize}
        page={ethnicsStore.page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
});

export default EthnicsTable;

