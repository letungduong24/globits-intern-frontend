import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStore } from '../../../stores';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    marginTop: theme.spacing(2),
  },
}));

const DepartmentTable = observer(() => {
  const classes = useStyles();
  const { departmentStore } = useStore();

  useEffect(() => {
    departmentStore.loadDepartments();
  }, [departmentStore.keyword]);

  // Flatten tree structure từ backend thành flat list cho Material Table
  const flattenTreeData = (items) => {
    const result = [];
    
    const flatten = (nodes) => {
      nodes.forEach((node) => {
        // Thêm node vào result
        result.push({
          ...node,
          // Đảm bảo có parentId để Material Table xác định parent-child
          parentId: node.parentId || (node.parent && node.parent.id) || null,
        });
        
        // Nếu có children, flatten tiếp
        if (node.children && node.children.length > 0) {
          flatten(node.children);
        }
      });
    };
    
    // Tìm root nodes (parent = null)
    const rootNodes = items.filter((item) => !item.parent || item.parent === null);
    flatten(rootNodes);
    
    return result;
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

  const actions = [
    {
      icon: () => <EditIcon />,
      tooltip: 'Sửa',
      onClick: (event, rowData) => {
        departmentStore.handleEdit(rowData);
      },
    },
    {
      icon: () => <DeleteIcon />,
      tooltip: 'Xóa',
      onClick: (event, rowData) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) {
          departmentStore.handleDelete(rowData.id);
        }
      },
    },
  ];

  // Flatten tree data từ backend
  const flatData = departmentStore.departments.length > 0 
    ? flattenTreeData(departmentStore.departments)
    : [];

  return (
    <div className={classes.tableWrapper}>
      <MaterialTable
        title="Danh mục phòng ban"
        columns={columns}
        data={flatData}
        parentChildData={(row, rows) => {
          // Material Table sẽ tự động xác định parent dựa vào parentId
          if (row.parentId) {
            return rows.find((a) => a.id === row.parentId);
          }
          return null;
        }}
        actions={actions}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          search: false,
          toolbar: false,
          headerStyle: {
            backgroundColor: '#e3f2fd',
            position: 'sticky',
            top: 0,
          },
          rowStyle: (rowData) => {
            // Màu nền khác cho child rows
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
        }}
        isLoading={departmentStore.loading}
      />
      {flatData.length > 0 && (
        <div style={{ padding: '10px', fontSize: '0.875rem' }}>
          Tổng số bản ghi: {flatData.length}
        </div>
      )}
    </div>
  );
});

export default DepartmentTable;
