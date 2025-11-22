import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Radio,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useStore } from '../../../stores';
import { pagingAllDepartments } from '../DepartmentService';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    minWidth: 600,
    maxHeight: 500,
  },
  searchField: {
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  treeRow: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  childRow: {
    backgroundColor: '#fafafa',
  },
  expandIcon: {
    cursor: 'pointer',
    padding: 4,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
}));

const DepartmentSelectPopup = observer(({ open, onClose, onSelect, excludeId }) => {
  const classes = useStyles();
  const { departmentStore } = useStore();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    if (open) {
      loadDepartments();
    }
  }, [open, page, pageSize, searchKeyword]);

  useEffect(() => {
    // Build tree structure
    const buildTree = (items) => {
      const itemMap = new Map();
      const roots = [];

      // First pass: create map of all items
      items.forEach((item) => {
        itemMap.set(item.id, { ...item, children: [] });
      });

      // Second pass: build tree
      items.forEach((item) => {
        const node = itemMap.get(item.id);
        if (item.parentId && itemMap.has(item.parentId)) {
          const parent = itemMap.get(item.parentId);
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      });

      // Flatten tree for display
      const flattenTree = (nodes, level = 0) => {
        const result = [];
        nodes.forEach((node) => {
          result.push({ ...node, level, hasChildren: node.children.length > 0 });
          if (expandedRows.has(node.id) && node.children.length > 0) {
            result.push(...flattenTree(node.children, level + 1));
          }
        });
        return result;
      };

      return flattenTree(roots);
    };

    if (departments.length > 0) {
      const flattened = buildTree(departments);
      setTreeData(flattened);
    } else {
      setTreeData([]);
    }
  }, [departments, expandedRows]);

  const loadDepartments = async () => {
    setLoading(true);
    try {
      const searchObject = {
        pageIndex: page + 1,
        pageSize: pageSize,
      };

      if (searchKeyword && searchKeyword.trim() !== '') {
        searchObject.keyword = searchKeyword.trim();
      }

      const response = await pagingAllDepartments(searchObject);
      const content = response?.data?.content || [];

      // Filter out the current department if editing
      const filteredContent = excludeId
        ? content.filter((dept) => dept.id !== excludeId)
        : content;

      setDepartments(filteredContent);
      setTotalElements(response?.data?.totalElements || 0);
    } catch (error) {
      console.error('Error loading departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    if (selectedDepartment) {
      onSelect(selectedDepartment);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedDepartment(null);
    setSearchKeyword('');
    setPage(0);
    setExpandedRows(new Set());
    onClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="department-select-dialog-title"
    >
      <DialogTitle id="department-select-dialog-title">
        Chọn phòng ban trực thuộc
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Nhập từ khóa"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
            setPage(0);
          }}
          className={classes.searchField}
        />
        <TableContainer component={Paper} style={{ maxHeight: 300 }}>
          <Table className={classes.table} aria-label="department select table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">Chọn</TableCell>
                <TableCell>Mã</TableCell>
                <TableCell align="left">Tên phòng ban</TableCell>
                <TableCell align="left">Mô tả</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <div className={classes.loadingContainer}>
                      <CircularProgress size={40} />
                    </div>
                  </TableCell>
                </TableRow>
              ) : treeData.length > 0 ? (
                treeData.map((department) => (
                  <TableRow
                    key={department.id}
                    className={department.level > 0 ? classes.childRow : classes.treeRow}
                    hover
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selectedDepartment?.id === department.id}
                        onChange={() => setSelectedDepartment(department)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ paddingLeft: `${department.level * 24 + 16}px` }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {department.hasChildren ? (
                          <IconButton
                            size="small"
                            onClick={() => toggleExpand(department.id)}
                            className={classes.expandIcon}
                          >
                            {expandedRows.has(department.id) ? (
                              <ExpandMoreIcon fontSize="small" />
                            ) : (
                              <ChevronRightIcon fontSize="small" />
                            )}
                          </IconButton>
                        ) : (
                          <span style={{ width: 32, display: 'inline-block' }} />
                        )}
                        {department.code}
                      </div>
                    </TableCell>
                    <TableCell align="left">{department.name}</TableCell>
                    <TableCell align="left">{department.description || '-'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: 10, fontSize: '0.875rem' }}>
          Tổng số bản ghi: {totalElements}
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalElements}
          rowsPerPage={pageSize}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Hủy
        </Button>
        <Button
          onClick={handleSelect}
          color="primary"
          variant="contained"
          disabled={!selectedDepartment}
        >
          Lựa chọn
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DepartmentSelectPopup;
