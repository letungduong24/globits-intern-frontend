import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
  makeStyles,
  InputAdornment,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import GlobitsTextField from '../../../common/form/GlobitsTextField';
import GlobitsDateTimePicker from '../../../common/form/GlobitsDateTimePicker';
import departmentSchema from '../schema/departmentSchema';
import { useStore } from '../../../stores';
import DepartmentSelectPopup from './DepartmentSelectPopup';

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBottom: theme.spacing(2),
  },
  dialogContent: {
    padding: theme.spacing(3),
  },
}));

const DepartmentModal = observer(() => {
  const classes = useStyles();
  const { departmentStore } = useStore();
  const [parentSelectOpen, setParentSelectOpen] = useState(false);
  const isEditMode = Boolean(departmentStore.currentDepartment);

  const initialValues = {
    name: departmentStore.currentDepartment?.name || '',
    code: departmentStore.currentDepartment?.code || '',
    description: departmentStore.currentDepartment?.description || '',
    func: departmentStore.currentDepartment?.func || '',
    industryBlock: departmentStore.currentDepartment?.industryBlock || '',
    foundedNumber: departmentStore.currentDepartment?.foundedNumber || '',
    foundedDate: departmentStore.currentDepartment?.foundedDate || null,
    displayOrder: departmentStore.currentDepartment?.displayOrder || '',
    parentId: departmentStore.currentDepartment?.parentId || null,
    parent: departmentStore.currentDepartment?.parent || null,
    id: departmentStore.currentDepartment?.id || null,
  };


  return (
    <>
      <Dialog
        open={departmentStore.open}
        onClose={departmentStore.handleClose}
        aria-labelledby="department-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="department-dialog-title">
          {isEditMode ? 'Sửa phòng ban' : 'Thêm mới phòng ban'}
        </DialogTitle>
        <Formik
          key={
            departmentStore.open
              ? departmentStore.currentDepartment?.id || 'new'
              : 'closed'
          }
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={departmentSchema}
          onSubmit={async (values, { resetForm }) => {
            resetForm();
            if (isEditMode) {
              await departmentStore.handleUpdate(values);
            } else {
              await departmentStore.handleCreate(values);
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <>
              <Form>
                <DialogContent className={classes.dialogContent}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <GlobitsTextField
                        name="name"
                        label="Tên phòng ban"
                        placeholder="Nhập tên phòng ban"
                        required
                        className={classes.formField}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <GlobitsTextField
                        name="code"
                        label="Mã phòng ban"
                        placeholder="Nhập mã phòng ban"
                        required
                        className={classes.formField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <GlobitsTextField
                        name="description"
                        label="Mô tả"
                        placeholder="Nhập mô tả"
                        multiline
                        rows={3}
                        className={classes.formField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <GlobitsTextField
                        name="parent"
                        label="Phòng ban trực thuộc"
                        placeholder="Chọn phòng ban trực thuộc"
                        value={
                          values.parent
                            ? `${values.parent.code} - ${values.parent.name}`
                            : ''
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setParentSelectOpen(true)}
                                edge="end"
                              >
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        className={classes.formField}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <GlobitsTextField
                        name="func"
                        label="Chức năng"
                        placeholder="Nhập chức năng"
                        className={classes.formField}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <GlobitsTextField
                        name="industryBlock"
                        label="Khối ngành"
                        placeholder="Nhập khối ngành"
                        className={classes.formField}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <GlobitsTextField
                        name="foundedNumber"
                        label="Số thành lập"
                        placeholder="Nhập số thành lập"
                        className={classes.formField}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <GlobitsDateTimePicker
                        name="foundedDate"
                        label="Ngày thành lập"
                        className={classes.formField}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <GlobitsTextField
                        name="displayOrder"
                        label="Thứ tự hiển thị"
                        placeholder="Nhập thứ tự hiển thị"
                        className={classes.formField}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={departmentStore.handleClose}
                    color="secondary"
                    variant="outlined"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    {isEditMode ? 'Cập nhật' : 'Tạo mới'}
                  </Button>
                </DialogActions>
              </Form>
              <DepartmentSelectPopup
                open={parentSelectOpen}
                onClose={() => setParentSelectOpen(false)}
                onSelect={(selectedDepartment) => {
                  setFieldValue('parent', selectedDepartment);
                  setFieldValue('parentId', selectedDepartment.id);
                  setParentSelectOpen(false);
                }}
                excludeId={values?.id}
              />
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
});

export default DepartmentModal;

