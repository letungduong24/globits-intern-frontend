import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FileUploadIcon from '@material-ui/icons/CloudUpload';
import DepartmentTable from './component/DepartmentTable';
import DepartmentModal from './component/DepartmentModal';
import { useStore } from '../../stores';

const DepartmentIndex = observer(() => {
  const { departmentStore } = useStore();

  useEffect(() => {
    departmentStore.loadDepartments();
  }, [departmentStore.page, departmentStore.pageSize, departmentStore.keyword]);

  const handleSearchChange = (event) => {
    departmentStore.setKeyword(event.target.value);
  };

  return (
    <div className="p-10 w-full">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <h2>Danh mục phòng ban</h2>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            placeholder="Nhập từ khóa"
            variant="outlined"
            size="small"
            value={departmentStore.keyword}
            onChange={handleSearchChange}
            style={{ width: 300 }}
          />
          <Button
            onClick={departmentStore.handleOpen}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Thêm mới
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FileUploadIcon />}
          >
            Nhập Excel
          </Button>
        </Box>
      </Box>
      <DepartmentTable />
      <DepartmentModal />
    </div>
  );
});

export default DepartmentIndex;

