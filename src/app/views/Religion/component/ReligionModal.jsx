import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Form, Formik } from 'formik';
import GlobitsTextField from '../../../common/form/GlobitsTextField';
import religionSchema from '../schema/religionSchema';
import { useStore } from '../../../stores';

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const ReligionModal = observer(() => {  
  const classes = useStyles();
  const { religionStore } = useStore();
  const isEditMode = Boolean(religionStore.currentReligion);

  const initialValues = {
    name: religionStore.currentReligion?.name || "",
    code: religionStore.currentReligion?.code || "",
    description: religionStore.currentReligion?.description || "",
    id: religionStore.currentReligion?.id || null
  };

  return (
    <Dialog
      open={religionStore.open}
      onClose={religionStore.handleClose}
      aria-labelledby="religion-dialog-title"
      aria-describedby="religion-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="religion-dialog-title">
        {isEditMode ? 'Edit Religion' : 'Create Religion'}
      </DialogTitle>
      <Formik
        key={religionStore.open ? (religionStore.currentReligion?.id || 'new') : 'closed'}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={religionSchema}
        onSubmit={async (values, { resetForm }) => {
            resetForm();
            if (isEditMode) {
                await religionStore.handleUpdate(values);
            } else {
                await religionStore.handleCreate(values);
            }
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <DialogContent>
              <GlobitsTextField
                name="name"
                label="Name"
                placeholder="Religion name"
                required
                className={classes.formField}
              />
              <GlobitsTextField
                name="code"
                label="Code"
                placeholder="Religion code"
                required
                className={classes.formField}
              />
              <GlobitsTextField
                name="description"
                label="Description"
                placeholder="Religion description"
                className={classes.formField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={religionStore.handleClose} color="secondary">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                type="submit"
                color="primary" 
                variant="contained"
              >
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

export default ReligionModal;

