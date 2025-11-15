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
import ethnicsSchema from '../schema/ethnicsSchema';
import { useStore } from '../../../stores';

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const EthnicsModal = observer(() => {  
  const classes = useStyles();
  const { ethnicsStore } = useStore();
  const isEditMode = Boolean(ethnicsStore.currentEthnicity);

  const initialValues = {
    name: ethnicsStore.currentEthnicity?.name || "",
    code: ethnicsStore.currentEthnicity?.code || "",
    description: ethnicsStore.currentEthnicity?.description || "",
    id: ethnicsStore.currentEthnicity?.id || null
  };

  return (
    <Dialog
      open={ethnicsStore.open}
      onClose={ethnicsStore.handleClose}
      aria-labelledby="ethnics-dialog-title"
      aria-describedby="ethnics-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="ethnics-dialog-title">
        {isEditMode ? 'Edit Ethnicity' : 'Create Ethnicity'}
      </DialogTitle>
      <Formik
        key={ethnicsStore.open ? (ethnicsStore.currentEthnicity?.id || 'new') : 'closed'}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={ethnicsSchema}
        onSubmit={async (values, { resetForm }) => {
            resetForm();
            if (isEditMode) {
                await ethnicsStore.handleUpdate(values);
            } else {
                await ethnicsStore.handleCreate(values);
            }
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <DialogContent>
              <GlobitsTextField
                name="name"
                label="Name"
                placeholder="Ethnicity name"
                required
                className={classes.formField}
              />
              <GlobitsTextField
                name="code"
                label="Code"
                placeholder="Ethnicity code"
                required
                className={classes.formField}
              />
              <GlobitsTextField
                name="description"
                label="Description"
                placeholder="Ethnicity description"
                className={classes.formField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={ethnicsStore.handleClose} color="secondary">
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

export default EthnicsModal;

