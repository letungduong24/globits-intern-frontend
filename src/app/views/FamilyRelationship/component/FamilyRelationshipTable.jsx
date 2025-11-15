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

const FamilyRelationshipTable = observer(() => {
  const classes = useStyles();
  const { familyRelationshipStore } = useStore();

  const handleChangePage = (event, newPage) => {
    familyRelationshipStore.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    familyRelationshipStore.setPageSize(parseInt(event.target.value, 10));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="family relationship table">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {familyRelationshipStore.familyRelationships.length > 0 ? (
            familyRelationshipStore.familyRelationships.map((familyRelationship) => (
              <TableRow key={familyRelationship.id}>
                <TableCell component="th" scope="row">
                  {familyRelationship.code}
                </TableCell>
                <TableCell align="left">{familyRelationship.name}</TableCell>
                <TableCell align="left">{familyRelationship.description || '-'}</TableCell>
                <TableCell align="left">
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={() => familyRelationshipStore.handleEdit(familyRelationship)}><EditIcon /></Button>
                    <Button onClick={() => familyRelationshipStore.handleDelete(familyRelationship.id)}><DeleteIcon /></Button>
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
        count={familyRelationshipStore.totalElements}
        rowsPerPage={familyRelationshipStore.pageSize}
        page={familyRelationshipStore.page}
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

export default FamilyRelationshipTable;

