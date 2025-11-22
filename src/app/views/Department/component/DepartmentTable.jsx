import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button, ButtonGroup, IconButton, CircularProgress } from '@material-ui/core';
import { useStore } from '../../../stores';

const useStyles = makeStyles({
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
});

const DepartmentTable = observer(() => {
  const classes = useStyles();
  const { departmentStore } = useStore();
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    departmentStore.loadDepartments();
  }, [departmentStore.keyword]);

  // Auto-expand all nodes by default to show tree structure
  useEffect(() => {
    if (departmentStore.departments.length > 0 && expandedRows.size === 0) {
      // Optionally auto-expand all nodes on first load
      // Uncomment below if you want all nodes expanded by default
      // const allIds = departmentStore.departments.map(d => d.id);
      // setExpandedRows(new Set(allIds));
    }
  }, [departmentStore.departments]);

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
        // Check both parentId and parent.id (handle both cases from backend)
        let parentId = null;
        if (item.parentId) {
          parentId = item.parentId;
        } else if (item.parent) {
          parentId = typeof item.parent === 'object' ? item.parent.id : item.parent;
        }
        
        if (parentId && itemMap.has(parentId)) {
          const parent = itemMap.get(parentId);
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

    if (departmentStore.departments.length > 0) {
      const flattened = buildTree(departmentStore.departments);
      setTreeData(flattened);
    } else {
      setTreeData([]);
    }
  }, [departmentStore.departments, expandedRows]);

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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="department table">
        <TableHead>
          <TableRow>
            <TableCell>Mã</TableCell>
            <TableCell align="left">Tên phòng ban</TableCell>
            <TableCell align="left">Mô tả</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departmentStore.loading ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <CircularProgress size={40} style={{ margin: '20px' }} />
              </TableCell>
            </TableRow>
          ) : treeData.length > 0 ? (
            treeData.map((department) => (
              <TableRow
                key={department.id}
                className={department.level > 0 ? classes.childRow : classes.treeRow}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.indentCell}
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
                <TableCell align="left">
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                  >
                    <Button onClick={() => departmentStore.handleEdit(department)}>
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          window.confirm(
                            'Bạn có chắc chắn muốn xóa phòng ban này?'
                          )
                        ) {
                          departmentStore.handleDelete(department.id);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
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
      {treeData.length > 0 && (
        <div style={{ padding: '10px', fontSize: '0.875rem' }}>
          Tổng số bản ghi: {treeData.length}
        </div>
      )}
    </TableContainer>
  );
});

export default DepartmentTable;
