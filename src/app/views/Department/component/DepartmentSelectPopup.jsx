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
} from '@material-ui/core';
import MaterialTable from 'material-table';
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

  useEffect(() => {
    if (open) {
      loadDepartments();
    }
  }, [open, page, pageSize, searchKeyword]);

  // Flatten tree structure từ backend thành flat list cho Material Table
  const flattenTreeData = (items) => {
    const result = [];
    
    const flatten = (nodes) => {
      nodes.forEach((node) => {
        result.push({
          ...node,
          parentId: node.parentId || (node.parent && node.parent.id) || null,
        });
        
        if (node.children && node.children.length > 0) {
          flatten(node.children);
        }
      });
    };
    
    const rootNodes = items.filter((item) => !item.parent || item.parent === null);
    flatten(rootNodes);
    
    return result;
  };

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
    onClose();
  };

  const columns = [
    {
      title: 'Mã',
      field: 'code',
      width: 150,
    },
    {
      title: 'Tên phòng ban',
      field: 'name',
      width: 250,
    },
    {
      title: 'Mô tả',
      field: 'description',
      width: 300,
    },
  ];

  // Flatten tree data
  const flatData = departments.length > 0 ? flattenTreeData(departments) : [];

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
        <MaterialTable
          columns={columns}
          data={flatData}
          parentChildData={(row, rows) => {
            if (row.parentId) {
              return rows.find((a) => a.id === row.parentId);
            }
            return null;
          }}
          onSelectionChange={(rows) => {
            if (rows && rows.length > 0) {
              setSelectedDepartment(rows[0]);
            } else {
              setSelectedDepartment(null);
            }
          }}
          options={{
            selection: true,
            selectionProps: (rowData) => ({
              checked: selectedDepartment?.id === rowData.id,
            }),
            paging: true,
            pageSize: pageSize,
            pageSizeOptions: [5, 10, 25, 50],
            search: false,
            toolbar: false,
            headerStyle: {
              backgroundColor: '#e3f2fd',
            },
            maxBodyHeight: 300,
            rowStyle: (rowData) => {
              if (rowData.parentId) {
                return { backgroundColor: '#fafafa' };
              }
              return {};
            },
          }}
          localization={{
            body: {
              emptyDataSourceMessage: 'Không có dữ liệu',
            },
            pagination: {
              labelRowsSelect: 'Số hàng mỗi trang',
              labelDisplayedRows: '{from}-{to} của {count}',
              firstTooltip: 'Trang đầu',
              previousTooltip: 'Trang trước',
              nextTooltip: 'Trang sau',
              lastTooltip: 'Trang cuối',
            },
          }}
          onChangePage={(newPage) => setPage(newPage)}
          onChangeRowsPerPage={(newPageSize) => {
            setPageSize(newPageSize);
            setPage(0);
          }}
          isLoading={loading}
        />
        <div style={{ marginTop: 10, fontSize: '0.875rem' }}>
          Tổng số bản ghi: {totalElements}
        </div>
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
